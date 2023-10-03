import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as bodyParser from "body-parser";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, stopAtFirstError: true }));
	app.enableCors();

	const config = new DocumentBuilder()
		.setTitle("Entrelah")
		.setDescription("Entrelah API Documentation")
		.setVersion("1.0.0")
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, document);

	app.use(bodyParser.json({ limit: "50mb" }));
	app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

	await app.listen(3000);
}
bootstrap();
