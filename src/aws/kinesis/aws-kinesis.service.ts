import * as AWS from 'aws-sdk'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AwsKinesisService {
  private kinesis: AWS.Kinesis

  constructor() {
    this.kinesis = new AWS.Kinesis({ apiVersion: '2013-12-02' })
  }

  public getRecords(
    params: AWS.Kinesis.GetRecordsInput,
  ): Promise<AWS.Kinesis.GetRecordsOutput> {
    return new Promise((resolve, reject) => {
      this.kinesis.getRecords(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  public getShardIterator(
    params: AWS.Kinesis.GetShardIteratorInput,
  ): Promise<AWS.Kinesis.GetShardIteratorOutput> {
    return new Promise((resolve, reject) => {
      this.kinesis.getShardIterator(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  public listShards(
    params: AWS.Kinesis.GetShardIteratorInput,
  ): Promise<AWS.Kinesis.ListShardsOutput> {
    return new Promise((resolve, reject) => {
      this.kinesis.listShards(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  public listStreams(
    params: AWS.Kinesis.ListStreamsInput,
  ): Promise<AWS.Kinesis.ListStreamsOutput> {
    return new Promise((resolve, reject) => {
      this.kinesis.listStreams(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  public streamExists(
    params: AWS.Kinesis.DescribeStreamInput,
  ): Promise<AWS.Kinesis.DescribeStreamOutput> {
    return new Promise((resolve, reject) => {
      this.kinesis.waitFor('streamExists', params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}
