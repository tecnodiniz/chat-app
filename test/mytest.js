const { expect } = require('chai');
const io = require('socket.io-client');
const server = require('../server');

describe('Chat Server', () => {
    let clientSocket;

    before(() => {
        server.listen(3000);
    });

    after(() => {
        server.close();
    });

    beforeEach(() => {
        clientSocket = io.connect('http://localhost:3000');
    });

    afterEach(() => {
        clientSocket.disconnect();
    });

    it('Deve enviar e receber mensagens corretamente', (done) => {
        clientSocket.emit('chat message', 'Testando mensagem');
        clientSocket.on('chat message', (msg) => {
            expect(msg).to.equal('Testando mensagem');
            done();
        });
    });
});
