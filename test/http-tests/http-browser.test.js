import { expect } from 'chai';
import { FakeXMLHttpRequest } from 'sinon';
import http from '../../src/http/http-browser';
const { HttpError, HttpParseError } = http;



describe('Http (Browser/XmlHttpRequest)', () => {
  let fakeXhr, sent;

  beforeEach(() => {
    sent = [];
    http.createXhr = () => {
        fakeXhr = new FakeXMLHttpRequest();
        fakeXhr.send = (data) => { sent.push(data) };
        return fakeXhr;
    };
  });


  describe('get()', () => {
    describe('response-text', () => {
      it('stores GET state on the Xhr object', () => {
        http.get('/foo');
        expect(fakeXhr.url).to.equal('/foo');
        expect(fakeXhr.method).to.equal('GET');
      });


      it('resolves promise with `responseText` (string)', (done) => {
        http.get('/foo').then((result) => {
            expect(result).to.equal('my-get');
            done();
        });
        fakeXhr.responseText = 'my-get';
        fakeXhr.status = 200;
        fakeXhr.readyState = 4;
        fakeXhr.onreadystatechange();
      });


      it('resolves promise with `undefined`', (done) => {
        http.get('/foo').then((result) => {
            expect(result).to.equal(null);
            done();
        });
        fakeXhr.status = 200;
        fakeXhr.readyState = 4;
        fakeXhr.onreadystatechange();
      });


      it('resolves promise with `null`', (done) => {
        http.get('/foo').then((result) => {
            expect(result).to.equal(null);
            done();
        });
        fakeXhr.responseText = null;
        fakeXhr.status = 200;
        fakeXhr.readyState = 4;
        fakeXhr.onreadystatechange();
      });



      it('throws an [HttpError] when status code is not 200', (done) => {
        http.get('/foo')
        .catch(HttpError, (err) => {
            expect(err.message).to.equal('Failed while making Http request to server.');
            expect(err.status).to.equal(500);
            done()
        });
        fakeXhr.status = 500;
        fakeXhr.readyState = 4;
        fakeXhr.onreadystatechange();
      });
    });


    describe('json', (done) => {
      it('resolves promise with JSON object', (done) => {
        http.get('/foo').then((result) => {
            expect(result).to.eql({ foo:123 });
            done();
        });
        fakeXhr.responseText = JSON.stringify({ foo:123 });
        fakeXhr.status = 200;
        fakeXhr.readyState = 4;
        fakeXhr.onreadystatechange();
      });


      it('resolves promise with JSON array', (done) => {
        http.get('/foo').then((result) => {
            expect(result).to.eql([1, 2, 3]);
            done();
        });
        fakeXhr.responseText = JSON.stringify([1, 2, 3]);
        fakeXhr.status = 200;
        fakeXhr.readyState = 4;
        fakeXhr.onreadystatechange();
      });


      it('throws if the response cannot be parsed as JSON', (done) => {
        http.get('/foo')
        .catch(HttpParseError, (err) => {
            expect(err.message).to.equal(`Failed to parse: '{not-json}'`);
            expect(err.responseText).to.equal('{not-json}');
            expect(err.parseError.message).to.equal('Unexpected token n');
            done();
        });
        fakeXhr.responseText = '{not-json}';
        fakeXhr.status = 200;
        fakeXhr.readyState = 4;
        fakeXhr.onreadystatechange();
      });
    });
  });



  describe('post()', () => {
    it('stores POST state on the Xhr object', () => {
      http.post('/foo', 123);
      expect(fakeXhr.url).to.equal('/foo');
      expect(fakeXhr.method).to.equal('POST');
      expect(fakeXhr.requestHeaders).to.eql({ 'Content-Type': 'application/json;charset=UTF-8' });
    });


    it('sends primitive value as data', () => {
      http.post('/foo', 123);
      expect(sent[0]).to.equal(123);
      expect(sent.length).to.equal(1);
    });


    it('sends object data as JSON string', () => {
      http.post('/foo', { foo:123 });
      expect(sent[0]).to.equal(JSON.stringify({ foo:123 }));
    });


    it('resolves promise with `responseText` (string)', (done) => {
      http.post('/foo', { foo:123 }).then((result) => {
          expect(result).to.equal('my-post');
          done();
      });
      fakeXhr.responseText = 'my-post';
      fakeXhr.status = 200;
      fakeXhr.readyState = 4;
      fakeXhr.onreadystatechange();
    });


    it('resolves promise with JSON', (done) => {
      http.post('/foo').then((result) => {
          expect(result).to.eql({ foo:123 });
          done();
      });
      fakeXhr.responseText = JSON.stringify({ foo:123 });
      fakeXhr.status = 200;
      fakeXhr.readyState = 4;
      fakeXhr.onreadystatechange();
    });


    it('throws an [HttpError] when status code is not 200', (done) => {
      http.post('/foo')
      .catch(HttpError, (err) => {
          expect(err.message).to.equal('Failed while making Http request to server.');
          expect(err.status).to.equal(500);
          done()
      });
      fakeXhr.status = 500;
      fakeXhr.readyState = 4;
      fakeXhr.onreadystatechange();
    });
  });



  describe('put()', () => {
    it('stores PUT state on the Xhr object', () => {
      http.put('/foo', 123);
      expect(fakeXhr.url).to.equal('/foo');
      expect(fakeXhr.method).to.equal('PUT');
      expect(fakeXhr.requestHeaders).to.eql({ 'Content-Type': 'application/json;charset=UTF-8' });
    });


    it('sends primitive value as data', () => {
      http.put('/foo', 123);
      expect(sent[0]).to.equal(123);
      expect(sent.length).to.equal(1);
    });


    it('sends object data as JSON string', () => {
      http.put('/foo', { foo:123 });
      expect(sent[0]).to.equal(JSON.stringify({ foo:123 }));
    });


    it('resolves promise with `responseText` (string)', (done) => {
      http.put('/foo', { foo:123 }).then((result) => {
          expect(result).to.equal('my-post');
          done();
      });
      fakeXhr.responseText = 'my-post';
      fakeXhr.status = 200;
      fakeXhr.readyState = 4;
      fakeXhr.onreadystatechange();
    });


    it('resolves promise with JSON', (done) => {
      http.put('/foo').then((result) => {
          expect(result).to.eql({ foo:123 });
          done();
      });
      fakeXhr.responseText = JSON.stringify({ foo:123 });
      fakeXhr.status = 200;
      fakeXhr.readyState = 4;
      fakeXhr.onreadystatechange();
    });


    it('throws an [HttpError] when status code is not 200', (done) => {
      http.put('/foo')
      .catch(HttpError, (err) => {
          expect(err.message).to.equal('Failed while making Http request to server.');
          expect(err.status).to.equal(500);
          done()
      });
      fakeXhr.status = 500;
      fakeXhr.readyState = 4;
      fakeXhr.onreadystatechange();
    });
  });


  describe('delete()', () => {
    it('stores DELETE state on the Xhr object', () => {
      http.delete('/foo');
      expect(fakeXhr.url).to.equal('/foo');
      expect(fakeXhr.method).to.equal('DELETE');
    });


    it('resolves promise with JSON', (done) => {
      http.delete('/foo').then((result) => {
          expect(result).to.eql({ isDeleted:true });
          done();
      });
      fakeXhr.responseText = JSON.stringify({ isDeleted:true });
      fakeXhr.status = 200;
      fakeXhr.readyState = 4;
      fakeXhr.onreadystatechange();
    });


    it('throws an [HttpError] when status code is not 200', (done) => {
      http.delete('/foo')
      .catch(HttpError, (err) => {
          expect(err.message).to.equal('Failed while making Http request to server.');
          expect(err.status).to.equal(500);
          done()
      });
      fakeXhr.status = 500;
      fakeXhr.readyState = 4;
      fakeXhr.onreadystatechange();
    });
  });
});
