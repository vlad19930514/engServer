import { ConfigService } from '@nestjs/config'
import { TypegooseModuleOptions } from 'nestjs-typegoose'

export const getMongoDbConfig = async (
  configService: ConfigService
): Promise<TypegooseModuleOptions> => ({
  uri: configService.get(
    process.env.NODE_ENV === 'production' ? 'MONGO_URI_PROD' : 'MONGO_URI'
  ),
})
//
