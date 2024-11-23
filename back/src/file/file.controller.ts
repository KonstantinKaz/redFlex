import {
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Res,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FileService } from './file.service'
import { Response } from 'express'
import { path } from 'app-root-path'
import { join } from 'path'

@Controller('files')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post()
	@HttpCode(200)
	@Auth('admin')
	@UseInterceptors(FileInterceptor('file'))
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
		@Query('folder') folder?: string
	) {
		return this.fileService.saveFiles([file], folder)
	}

	@Get('uploads/:folder/:filename')
	async serveFile(
		@Param('folder') folder: string,
		@Param('filename') filename: string,
		@Res() res: Response
	) {
		const filePath = join(path, 'uploads', folder, filename)
		return res.sendFile(filePath)
	}
}
