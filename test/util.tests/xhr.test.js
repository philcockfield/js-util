import { expect } from 'chai';
import { FakeXMLHttpRequest } from 'sinon';
import { xhr } from '../../';
const { XhrError, XhrParseError } = xhr;



describe('Http (XmlHttpRequest)', () => {
  let fakeXhr, sent;

  beforeEach(() => {
    sent = [];
    xhr.createXhr = () => {
        fakeXhr = new FakeXMLHttpRequest();
        fakeXhr.send = (data) => { sent.push(data) };
        return fakeXhr;
    };
  });


  describe('get()', () => {
    describe('response-text', () => {
      it('stores GET state on the Xhr object', () => {
        xhr.get('/foo');
        expect(fakeXhr.url).to.equal('/foo');
        expect(fakeXhr.method).to.equal('GET');
      });


      it('resolves promise with `responseText` (string)', (done) => {
        xhr.get('/foo').then((result) => {
            expect(result).to.equal('my-get');
            done();
        });
        fakeXhr.responseText = 'my-get';
        fakeXhr.status = 200;
        fakeXhr.onload();
      });


      it('resolves promise with `undefined`', (done) => {
        xhr.get('/foo').then((result) => {
            expect(result).to.equal(null);
            done();
        });
        fakeXhr.status = 200;
        fakeXhr.onload();
      });


      it('resolves promise with `null`', (done) => {
        xhr.get('/foo').then((result) => {
            expect(result).to.equal(null);
            done();
        });
        fakeXhr.responseText = null;
        fakeXhr.status = 200;
        fakeXhr.onload();
      });



      it('throws an [XhrError] when status code is not 200', (done) => {
        xhr.get('/foo')
        .catch(XhrError, (err) => {
            expect(err.message).to.equal('Failed while making Http request to server.');
            expect(err.status).to.equal(500);
            done()
        });
        fakeXhr.status = 500;
        fakeXhr.onload();
      });
    });


    describe('json', (done) => {
      it('resolves promise with JSON object', (done) => {
        xhr.get('/foo').then((result) => {
            expect(result).to.eql({ foo:123 });
            done();
        });
        fakeXhr.responseText = JSON.stringify({ foo:123 });
        fakeXhr.status = 200;
        fakeXhr.onload();
      });


      it('resolves promise with JSON array', (done) => {
        xhr.get('/foo').then((result) => {
            expect(result).to.eql([1, 2, 3]);
            done();
        });
        fakeXhr.responseText = JSON.stringify([1, 2, 3]);
        fakeXhr.status = 200;
        fakeXhr.onload();
      });


      it('throws if the response cannot be parsed as JSON', (done) => {
        xhr.get('/foo')
        .catch(XhrParseError, (err) => {
            expect(err.message).to.equal(`Failed to parse: '{not-json}'`);
            expect(err.responseText).to.equal('{not-json}');
            expect(err.parseError.message).to.equal('Unexpected token n');
            done();
        });
        fakeXhr.responseText = '{not-json}';
        fakeXhr.status = 200;
        fakeXhr.onload();
      });
    });
  });



  describe('post()', () => {
    it('stores POST state on the Xhr object', () => {
      xhr.post('/foo', 123);
      expect(fakeXhr.url).to.equal('/foo');
      expect(fakeXhr.method).to.equal('POST');
      expect(fakeXhr.requestHeaders).to.eql({ 'Content-Type': 'application/json;charset=UTF-8' });
    });


    it('sends primitive value as data', () => {
      xhr.post('/foo', 123);
      expect(sent[0]).to.equal(123);
      expect(sent.length).to.equal(1);
    });


    it('sends object data as JSON string', () => {
      xhr.post('/foo', { foo:123 });
      expect(sent[0]).to.equal(JSON.stringify({ foo:123 }));
    });


    it('resolves promise with `responseText` (string)', (done) => {
      xhr.post('/foo', { foo:123 }).then((result) => {
          expect(result).to.equal('my-post');
          done();
      });
      fakeXhr.responseText = 'my-post';
      fakeXhr.status = 200;
      fakeXhr.readyState = 4;
      fakeXhr.onreadystatechange();
    });


    it('resolves promise with JSON', (done) => {
      xhr.post('/foo').then((result) => {
          expect(result).to.eql({ foo:123 });
          done();
      });
      fakeXhr.responseText = JSON.stringify({ foo:123 });
      fakeXhr.status = 200;
      fakeXhr.readyState = 4;
      fakeXhr.onreadystatechange();
    });


    it('throws an [XhrError] when status code is not 200', (done) => {
      xhr.post('/foo')
      .catch(XhrError, (err) => {
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
      xhr.put('/foo', 123);
      expect(fakeXhr.url).to.equal('/foo');
      expect(fakeXhr.method).to.equal('PUT');
      expect(fakeXhr.requestHeaders).to.eql({ 'Content-Type': 'application/json;charset=UTF-8' });
    });


    it('sends primitive value as data', () => {
      xhr.put('/foo', 123);
      expect(sent[0]).to.equal(123);
      expect(sent.length).to.equal(1);
    });


    it('sends object data as JSON string', () => {
      xhr.put('/foo', { foo:123 });
      expect(sent[0]).to.equal(JSON.stringify({ foo:123 }));
    });


    it('resolves promise with `responseText` (string)', (done) => {
      xhr.put('/foo', { foo:123 }).then((result) => {
          expect(result).to.equal('my-post');
          done();
      });
      fakeXhr.responseText = 'my-post';
      fakeXhr.status = 200;
      fakeXhr.readyState = 4;
      fakeXhr.onreadystatechange();
    });


    it('resolves promise with JSON', (done) => {
      xhr.put('/foo').then((result) => {
          expect(result).to.eql({ foo:123 });
          done();
      });
      fakeXhr.responseText = JSON.stringify({ foo:123 });
      fakeXhr.status = 200;
      fakeXhr.readyState = 4;
      fakeXhr.onreadystatechange();
    });


    it('throws an [XhrError] when status code is not 200', (done) => {
      xhr.put('/foo')
      .catch(XhrError, (err) => {
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
      xhr.delete('/foo');
      expect(fakeXhr.url).to.equal('/foo');
      expect(fakeXhr.method).to.equal('DELETE');
    });


    it('resolves promise with JSON', (done) => {
      xhr.delete('/foo').then((result) => {
          expect(result).to.eql({ isDeleted:true });
          done();
      });
      fakeXhr.responseText = JSON.stringify({ isDeleted:true });
      fakeXhr.status = 200;
      fakeXhr.readyState = 4;
      fakeXhr.onreadystatechange();
    });


    it('throws an [XhrError] when status code is not 200', (done) => {
      xhr.delete('/foo')
      .catch(XhrError, (err) => {
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
