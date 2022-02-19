import * as AWS from 'aws-sdk'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AwsLambdaService {
  private lambda: AWS.Lambda

  constructor() {
    this.lambda = new AWS.Lambda({ apiVersion: '2015-03-31' })
  }

  public listAliases(): Promise<AWS.Lambda.ListAliasesResponse> {
    return new Promise((resolve, reject) => {
      this.lambda.listAliases((err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  public getFunction(): Promise<AWS.Lambda.GetFunctionResponse> {
    return new Promise((resolve, reject) => {
      this.lambda.getFunction((err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  public listFunctions(): Promise<AWS.Lambda.ListFunctionsResponse> {
    return new Promise((resolve, reject) => {
      this.lambda.listFunctions((err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  public invoke(): Promise<AWS.Lambda.InvocationResponse> {
    return new Promise((resolve, reject) => {
      this.lambda.invoke((err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  public invokeAsync(): Promise<AWS.Lambda.InvokeAsyncResponse> {
    return new Promise((resolve, reject) => {
      this.lambda.invokeAsync((err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  public functionActive(
    params: AWS.Lambda.GetFunctionConfigurationRequest,
  ): Promise<AWS.Lambda.FunctionConfiguration> {
    return new Promise((resolve, reject) => {
      this.lambda.waitFor('functionActive', params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  public functionExists(
    params: AWS.Lambda.GetFunctionRequest,
  ): Promise<AWS.Lambda.GetFunctionResponse> {
    return new Promise((resolve, reject) => {
      this.lambda.waitFor('functionExists', params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
}
