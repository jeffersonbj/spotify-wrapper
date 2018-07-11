//getAlbum
//getAlbumTracks
import chai, {
  expect
} from 'chai';

import {
  getAlbum,
  getAlbums,
  getAlbumTracks
} from '../src/album';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('Smoke Tests', () => {

    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(getAlbums).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    //verifica se o fetch ocorre
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    })
    //verifica se o fetch ocorre com a url correta
    it('should call fetch with the correct URL', () => {
      const album = getAlbum('2i6nd4FV6y7K9fln6eelmR');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR');

      const album2 = getAlbum('2i6nd4FV6y7K9fln6eelmE');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmE');
    })

    //verifica se o dado é recebido pela Promise
    it('should return the correct data from Promise', () => {
      promise.resolves({
        album: 'name'
      });
      const album = getAlbum('2i6nd4FV6y7K9fln6eelmR');
      expect(album.resolveValue).to.be.eql({
        album: 'name'
      });
    })
  });

  describe('getAlbums', () => {
    //verifica se o fetch ocorre
    it('should call fetch method', () => {
      const album = getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    })
    //verifica se o fetch ocorre com a url correta
    it('should call fetch with the correct URL', () => {
      const album = getAlbums(['2i6nd4FV6y7K9fln6eelmR', '3i6nd4FV6y7K9fln6eelmR']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=2i6nd4FV6y7K9fln6eelmR,3i6nd4FV6y7K9fln6eelmR');
    })

    //verifica se o dado é recebido pela Promise
    it('should return the correct data from Promise', () => {
      promise.resolves({
        album: 'name'
      });
      const album = getAlbums(['2i6nd4FV6y7K9fln6eelmR','3i6nd4FV6y7K9fln6eelmR']);
      expect(album.resolveValue).to.be.eql({
        album: 'name'
      });
    })
  });

  describe('getAlbumsTracks', () => {
    //verifica se o fetch ocorre
    it('should call fetch method', () => {
      const album = getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    })
    //verifica se o fetch ocorre com a url correta
    it('should call fetch with the correct URL', () => {
      const album = getAlbumTracks('2i6nd4FV6y7K9fln6eelmR');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR/tracks');      
    })

    //verifica se o dado é recebido pela Promise
    it('should return the correct data from Promise', () => {
      promise.resolves({
        album: 'name'
      });
      const album = getAlbumTracks('2i6nd4FV6y7K9fln6eelmR');
      expect(album.resolveValue).to.be.eql({
        album: 'name'
      });
    })
  });

});
