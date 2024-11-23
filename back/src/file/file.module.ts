import { Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { FileController } from './file.controller'
import { FileService } from './file.service'

@Module({
	providers: [FileService],
	controllers: [FileController],
	exports: [FileService]
})
export class FileModule {}
