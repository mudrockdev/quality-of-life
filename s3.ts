import { S3Client } from 'bun';

const s3 = new S3Client({
	accessKeyId: '',
	secretAccessKey: '',
	bucket: '',
	endpoint: '',
	region: ''
});

console.warn('S3 Client initialized');

console.warn('Writing file to S3...');
try {
	await s3.write('test.txt', 'Hello, World!');
	console.log('File written successfully');
} catch (error) {
	console.error(error);
}

console.warn('Reading file from S3...');
try {
	const file = s3.file('test.txt');
	if (file) {
		console.log('File read successfully');
	}
} catch (error) {
	console.error(error);
}

console.warn('Deleting file from S3...');
try {
	await s3.delete('test.txt');
} catch (error) {
	console.error(error);
}
