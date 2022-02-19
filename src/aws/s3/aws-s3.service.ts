import * as AWS from 'aws-sdk'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AwsS3Service {
  private s3: AWS.S3

  constructor() {
    this.s3 = new AWS.S3({ apiVersion: '2006-03-01' })
  }

  public bucketExists(params: AWS.S3.HeadBucketRequest): Promise<boolean> {
    return new Promise((resolve) => {
      this.s3.waitFor('bucketExists', params, (err) => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  public objectExists(
    params: AWS.S3.HeadObjectRequest,
  ): Promise<AWS.S3.HeadObjectOutput> {
    return new Promise((resolve, reject) => {
      this.s3.waitFor('objectExists', params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  public getObject(
    params: AWS.S3.GetObjectRequest,
  ): Promise<AWS.S3.GetObjectOutput> {
    return new Promise((resolve, reject) => {
      this.s3.getObject(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  public putObject(
    params: AWS.S3.PutObjectRequest,
  ): Promise<AWS.S3.PutObjectOutput> {
    return new Promise((resolve, reject) => {
      this.s3.putObject(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}
