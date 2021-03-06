
// import { Client } from 'elasticsearch';


export class TensorflowController {
  constructor(server) {
    this.server = server;
    this.tfEndpointUrl = this.server.config().get('arcanna.endpoint.url');
    this.tfEndpointToken = this.server.config().get('arcanna.endpoint.token');
    this.tfEndpointHeader = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    // this.esClient = new Client({
    //   host: server.config().get('elasticsearch.url')
    // });
  }

  async train(req, reply) {
    try {
      const jobId = req.payload.jobId;
      const body = {
        apiToken: this.tfEndpointToken,
        action: 'TRAIN',
        jobId: jobId
      };
      const fetch = require('node-fetch');
      return fetch(this.tfEndpointUrl +'/api/v1/execute', {
        method: "POST",
        headers: this.tfEndpointHeader,
        body: JSON.stringify(body)
      }).then(response => {
        return {response: response.json()};
      }).catch(err => {
        console.error(err);
        return {error: err};
      });
    } catch(err) {
      console.error(err);
      return {error: err};
    }
  }

  async evaluate(req, reply) {
    try {
      const jobId = req.payload.jobId;
      const body = {
        apiToken: this.tfEndpointToken,
        action: 'EVALUATE',
        jobId: jobId
      };

      const fetch = require('node-fetch');
      return fetch(this.tfEndpointUrl +'/api/v1/execute', {
        method: "POST",
        headers: this.tfEndpointHeader,
        body: JSON.stringify(body)
      }).then(response => {
        return {response: response.json()};
      }).catch(err => {
        console.error(err);
        return {error: err};
      });
    } catch(err) {
      console.error(err);
      return {error: err};
    }
  }

  async pause(req, reply) {
    try {
      const jobId = req.payload.jobId;
      const body = {
        apiToken: this.tfEndpointToken,
        action: 'PAUSE',
        jobId: jobId
      };
      const fetch = require('node-fetch');
      return fetch(this.tfEndpointUrl +'/api/v1/execute', {
        method: "POST",
        headers: this.tfEndpointHeader,
        body: JSON.stringify(body)
      }).then(response => {
        return {response: response.json()};
      }).catch(err => {
        console.error(err);
        return {error: err};
      });
    } catch(err) {
      console.error(err);
      return {error: err};
    } 
  }

  async stop(req, reply) {
    try {
      const jobId = req.payload.jobId;
      const body = {
        apiToken: this.tfEndpointToken,
        action: 'STOP',
        jobId: jobId
      };
      const fetch = require('node-fetch');
      return fetch(this.tfEndpointUrl +'/api/v1/execute', {
        method: "POST",
        headers: this.tfEndpointHeader,
        body: JSON.stringify(body)
      }).then(response => {
        return {response: response.json()};
      }).catch(err => {
        console.error(err);
        return {error: err};
      });
    } catch(err) {
      console.error(err);
      return {error: err};
    } 
  }

  async healthCheck(req, reply) {
    try {
      const body = {
        apiToken: this.tfEndpointToken
      };
      const fetch = require('node-fetch');
      return fetch(this.tfEndpointUrl +'/health', {
        method: "POST",
        headers: this.tfEndpointHeader,
        body: JSON.stringify(body)
      }).then(response => {
        return {response: response.json()};
      }).catch(err => {
        console.error(err);
        return {error: err};
      });
    } catch(err) {
      console.error(err);
      return {error: err};
    }
  }
}