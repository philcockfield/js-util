import { expect } from 'chai';
import sinon from 'sinon';
import { FakeXMLHttpRequest } from 'sinon';
import { xhr } from '../../';
const { XhrError, XhrParseError } = xhr;



describe('Http (XmlHttpRequest)', () => {
  let fakeXhr, requests;

  beforeEach(() => {
    xhr.createXhr = () => {
        fakeXhr = new FakeXMLHttpRequest();
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
      expect(fakeXhr.requestHeaders).to.eql({ 'Content-Type': 'application/json;charset=utf-8' });
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

});