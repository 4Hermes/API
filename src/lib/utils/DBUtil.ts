import { logger } from '@4lch4/logger'
import * as MongoDB from 'mongodb'
import { IAppConfig, IFriend, IFriend_INSERT } from '../../interfaces/index.js'
import { MONGODB_DB_NAME } from '../index.js'

/**
 * This class is a utility class that provides methods/functions to help
 * simplify interacting with the MongoDB Cluster where all of the application
 * data is stored.
 */
export class DBUtil {
  private client: MongoDB.MongoClient
  private connected: boolean = false
  private collections: {
    /** Contains data on the Friends of Users. */
    friendsCollection?: MongoDB.Collection

    /** Contains Hermes configuration data. */
    configCollection?: MongoDB.Collection

    /** Contains information on Users of Hermes. */
    usersCollection?: MongoDB.Collection

    /** Where I store all past Check-Ins that have occurred. */
    checkInCollection?: MongoDB.Collection
  } = {}

  constructor(private config: IAppConfig) {
    this.client = new MongoDB.MongoClient(config.dbConfig.connectionString, {
      appName: config.name,
      retryReads: true,
      retryWrites: true,
    })
  }

  /** Disconnects from the MongoDB Cluster. */
  public async disconnect(): Promise<DBUtil> {
    // First, check if the DB is connected.
    if (this.connected) {
      logger.info(`[DBUtil#disconnect]: Disconnecting from the MongoDB Cluster...`)

      // Disconnect from the MongoDB Cluster.
      await this.client.close()

      // Set the `connected` property to `false`.
      this.connected = false

      // Log a success message.
      logger.success(`Successfully disconnected from the MongoDB Cluster.`)
    } else {
      logger.warn(
        `[DBUtil#disconnect]: Cannot disconnect from the MongoDB Cluster because the DB is not connected.`
      )
    }

    return this
  }

  /**
   * Connects to the MongoDB Cluster and loads the collections that the
   * application will be interacting with.
   */
  public async connect(): Promise<DBUtil> {
    // First, check if the DB is connected.
    if (this.connected) {
      // Log a warning message stating that the DB is already connected.
      logger.warn(
        `[DBUtil#connect]: Cannot connect to the MongoDB Cluster because the DB is already connected.`
      )
    } else {
      // Connect the client to the MongoDB Cluster.
      await this.client.connect()

      // Connect to the `hermes` DB.
      const db: MongoDB.Db = this.client.db(MONGODB_DB_NAME)

      // Load the `friends` collection.
      this.collections.friendsCollection = db.collection(
        this.config.dbConfig.collections.friends.collectionName
      )

      // Load the `config` collection.
      this.collections.configCollection = db.collection(
        this.config.dbConfig.collections.config.collectionName
      )

      // Load the `users` collection.
      this.collections.usersCollection = db.collection(
        this.config.dbConfig.collections.users.collectionName
      )

      // Load the `check-ins` collection.
      this.collections.usersCollection = db.collection(
        this.config.dbConfig.collections.users.collectionName
      )

      // Set the `connected` property to `true`.
      this.connected = true

      // Log a success message.
      logger.success(
        `Successfully connected to database (${MONGODB_DB_NAME}) and collections (config, friends, users, check-ins)...`
      )
    }

    return this
  }

  /**
   * Attempts to insert a new Friend object into the DB and returns the result
   * of the operation.
   *
   * @param friend The Friend object to insert into the DB.
   *
   * @returns The result of the insert operation.
   */
  public async insertFriend(
    friend: IFriend_INSERT
  ): Promise<MongoDB.InsertOneResult<IFriend> | undefined> {
    if (this.connected) {
      try {
        return this.collections.friendsCollection?.insertOne(friend)
      } catch (error) {
        throw error
      }
    } else {
      logger.error(`Cannot insert friend because the DB is not connected.`)

      return undefined
    }
  }

  public async getFriends(
    userId?: string
  ): Promise<MongoDB.WithId<MongoDB.Document>[] | undefined | null> {
    if (this.connected) {
      try {
        const filter = { relatedFriend: new MongoDB.ObjectId(userId) }
        const res = this.collections.friendsCollection?.find(filter)

        logger.info(`[DBUtil#getFriends]: res = ${JSON.stringify(res, null, 2)}`)

        return await res?.toArray()
      } catch (error) {
        throw error
      }
    } else {
      logger.error(`Cannot get friend(s) because the DB is not connected.`)

      return undefined
    }
  }

  public async getFriend(
    filter: MongoDB.Filter<MongoDB.Document>
  ): Promise<MongoDB.WithId<IFriend> | undefined | null> {
    if (this.connected) {
      try {
        logger.info(`[DBUtil#getFriend]: filter = ${JSON.stringify(filter, null, 2)}`)
        return this.collections.friendsCollection?.findOne(filter)
      } catch (error) {
        throw error
      }
    } else {
      logger.error(`Cannot get friend because the DB is not connected.`)

      return undefined
    }
  }

  public async updateFriend(
    friend: IFriend
  ): Promise<MongoDB.ModifyResult<MongoDB.Document> | undefined> {
    if (this.connected) {
      try {
        return this.collections.friendsCollection?.findOneAndUpdate({ _id: friend._id }, friend)
      } catch (error) {
        throw error
      }
    } else {
      logger.error(`Cannot update friend because the DB is not connected.`)

      return undefined
    }
  }

  // public async insertAndroidEvent(
  //   event: IAndroidEvent
  // ): Promise<MongoDB.InsertOneResult<MongoDB.Document> | undefined> {
  //   if (this.connected) {
  //     try {
  //       return this.collections.androidEvents?.insertOne(event)
  //     } catch (error) {
  //       throw error
  //     }
  //   } else {
  //     logger.error(
  //       `Cannot insert android event because the DB is not connected.`
  //     )

  //     return undefined
  //   }
  // }
}
