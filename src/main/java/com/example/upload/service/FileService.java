package com.example.upload.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FileService {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public FileService(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        PutObjectRequest request = new PutObjectRequest(
                bucketName,
                fileName,
                file.getInputStream(),
                metadata
        ); // ❌ Removed .withCannedAcl

        amazonS3.putObject(request);

        return amazonS3.getUrl(bucketName, fileName).toString();
    }

    public List<String> listFiles() {
        ListObjectsV2Result result = amazonS3.listObjectsV2(bucketName);
        return result.getObjectSummaries()
                .stream()
                .map(S3ObjectSummary::getKey)
                .map(key -> amazonS3.getUrl(bucketName, key).toString())
                .collect(Collectors.toList());
    }

    public void deleteFile(String fileName) {
        amazonS3.deleteObject(bucketName, fileName);
    }
}
