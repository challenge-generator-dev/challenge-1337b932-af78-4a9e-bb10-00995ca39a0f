import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolConfig } from 'pg';
import mongoose, { ConnectOptions } from 'mongoose';
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

export interface DatabaseConfig {
  sql: PoolConfig;
  nosql: ConnectOptions;
  dynamodb: DynamoDBClientConfig;
}

export interface SqlConnectionOptions {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  max?: number;
  idleTimeoutMillis?: number;
  connectionTimeoutMillis?: number;
}

export interface NosqlConnectionOptions {
  uri: string;
  dbName?: string;
}

export interface DynamodbConnectionOptions {
  region: string;
  endpoint?: string;
  credentials?: {
    accessKeyId: string;
    secretAccessKey: string;
  };
}

@Injectable()
export class DatabaseConfigService {
  private sqlPool: Pool | null = null;
  private nosqlConnection: typeof mongoose | null = null;

  constructor(private readonly configService: ConfigService) {}

  getSqlConfig(): PoolConfig {
    return {
      host: this.configService.get<string>('DATABASE_SQL_HOST', 'localhost'),
      port: this.configService.get<number>('DATABASE_SQL_PORT', 5432),
      database: this.configService.get<string>('DATABASE_SQL_NAME', 'inventory_db'),
      user: this.configService.get<string>('DATABASE_SQL_USER', 'postgres'),
      password: this.configService.get<string>('DATABASE_SQL_PASSWORD', 'postgres'),
      max: this.configService.get<number>('DATABASE_SQL_POOL_MAX', 20),
      idleTimeoutMillis: this.configService.get<number>('DATABASE_SQL_IDLE_TIMEOUT', 30000),
      connectionTimeoutMillis: this.configService.get<number>('DATABASE_SQL_CONNECTION_TIMEOUT', 2000),
    };
  }

  getNosqlConfig(): ConnectOptions {
    const uri = this.configService.get<string>('DATABASE_NOSQL_URI', 'mongodb://localhost:27017');
    const dbName = this.configService.get<string>('DATABASE_NOSQL_NAME', 'inventory_nosql');
    
    return {
      uri,
      dbName,
    } as ConnectOptions;
  }

  getDynamodbConfig(): DynamoDBClientConfig {
    const region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    const endpoint = this.configService.get<string>('AWS_ENDPOINT');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');

    const config: DynamoDBClientConfig = {
      region,
    };

    if (endpoint) {
      config.endpoint = endpoint;
    }

    if (accessKeyId && secretAccessKey) {
      config.credentials = {
        accessKeyId,
        secretAccessKey,
      };
    }

    return config;
  }

  async createSqlPool(): Promise<Pool> {
    if (!this.sqlPool) {
      const poolConfig = this.getSqlConfig();
      this.sqlPool = new Pool(poolConfig);
      
      this.sqlPool.on('error', (err) => {
        console.error('SQL Pool unexpected error:', err.message);
      });

      this.sqlPool.on('connect', () => {
        console.log('New SQL client connected to database');
      });
    }
    return this.sqlPool;
  }

  async createNosqlConnection(): Promise<typeof mongoose> {
    if (!this.nosqlConnection) {
      const options = this.getNosqlConfig();
      this.nosqlConnection = await mongoose.connect(options.uri as string, {
        dbName: options.dbName,
      });
      
      mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully');
      });

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err.message);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
      });
    }
    return this.nosqlConnection;
  }

  async closeSqlPool(): Promise<void> {
    if (this.sqlPool) {
      await this.sqlPool.end();
      this.sqlPool = null;
      console.log('SQL Pool closed');
    }
  }

  async closeNosqlConnection(): Promise<void> {
    if (this.nosqlConnection) {
      await this.nosqlConnection.disconnect();
      this.nosqlConnection = null;
      console.log('MongoDB connection closed');
    }
  }

  getSqlPool(): Pool | null {
    return this.sqlPool;
  }

  getNosqlConnection(): typeof mongoose | null {
    return this.nosqlConnection;
  }

  validateSqlConfig(): boolean {
    const config = this.getSqlConfig();
    return !!(config.host && config.port && config.database && config.user);
  }

  validateNosqlConfig(): boolean {
    const config = this.getNosqlConfig();
    return !!(config.uri);
  }

  validateDynamodbConfig(): boolean {
    const config = this.getDynamodbConfig();
    return !!config.region;
  }
}

export const databaseConfigProvider = {
  provide: DatabaseConfigService,
  useFactory: (configService: ConfigService) => {
    return new DatabaseConfigService(configService);
  },
  inject: [ConfigService],
};