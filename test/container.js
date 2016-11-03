import chai from 'chai'
import * as test_utils from './utils'
import Container from '../lib/container'
import Image from '../lib/image'
import {default as MemoryStream} from 'memorystream'

const should = chai.should()

const docker = test_utils.init()
const containerNames = new Map([
  [ 'create', 'docker_api_test_create' ],
  [ 'inspect', 'docker_api_test_inspect' ],
  [ 'top', 'docker_api_test_top' ],
  [ 'logs', 'docker_api_test_logs' ],
  [ 'changes', 'docker_api_test_changes' ],
  [ 'export', 'docker_api_test_export' ],
  [ 'stats', 'docker_api_test_stats' ],
  [ 'resize', 'docker_api_test_resize' ],
  [ 'start', 'docker_api_test_start' ],
  [ 'stop', 'docker_api_test_stop' ],
  [ 'restart', 'docker_api_test_restart' ],
  [ 'kill', 'docker_api_test_kill' ],
  [ 'update', 'docker_api_test_update' ],
  [ 'rename', 'docker_api_test_rename' ],
  [ 'pause', 'docker_api_test_pause' ],
  [ 'attach', 'docker_api_test_attach' ],
  [ 'commit', 'docker_api_test_commit' ],
  [ 'exec', 'docker_api_test_exec' ],
  [ 'inspect_exec', 'docker_api_test_inspect_exec' ],
  [ 'get_archive', 'docker_api_test_get_archive' ],
  [ 'put_archive', 'docker_api_test_put_archive' ],
  [ 'info_archive', 'docker_api_test_info_archive' ]
])

describe('#container', function () {
  describe('#list', function () {
    it('should receive an array of containers', function () {
      this.timeout(30000)
      return docker.container.list()
        .then((containers) => {
          containers.should.be.an('array')
        })
    })
  })

  describe('#create', function () {
    it('should create a container', function () {
      this.timeout(30000)
      return docker.container.create({ Image: 'ubuntu', name: containerNames.get('create') })
        .then((container) => {
          container.should.be.instanceof(Container)
        })
    })
  })
  
  describe('#inspect', function () {
    it('should inspect a container', function () {
      this.timeout(30000)
      return docker.container.create({ Image: 'ubuntu', name: containerNames.get('inspect') })
        .then((container) => {
          return container.status()
        })
        .then((container) => {
          container.should.be.instanceof(Container)
        })
    })
  })
  
  describe('#top', function () {
    it('should get top processes', function () {
      this.timeout(30000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('top') 
      })
        .then((container) => {
          return container.start()
        })
        .then((container) => {
          return container.top()
        })
        .then((processes) => {
          processes.Processes.should.be.an('array')
        })
    })
  })
  
  describe('#logs', function () {
    it('should get container log', function () {
      this.timeout(30000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('logs') 
      })
        .then((container) => {
          return container.start()
        })
        .then((container) => {
          return container.logs({ stdout: 1, follow: true })
        })
        .then((logs) => {
          logs.pipe.should.exist
        })
    })
  })
  
  describe('#changes', function () {
    it('should get container log', function () {
      this.timeout(30000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'echo "xfoo" > foo.txt' ], 
        name: containerNames.get('changes') 
      })
        .then((container) => {
          return container.start()
        })
        .then((container) => {
          return container.changes()
        })
        .then((changes) => {
          changes.should.be.an('array')
        })
    })
  })
  
  describe('#export', function () {
    it('should export a container', function () {
      this.timeout(30000)
      return docker.container.create({ Image: 'ubuntu', name: containerNames.get('export') })
        .then((container) => {
          return container.export({ stream: false })
        })
        .then((container) => {
          container.should.be.ok
        })
    })
  })
  
  describe('#stats', function () {
    it('should get stats of a container', function () {
      this.timeout(70000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('stats') 
      })
        .then((container) => {
          return container.start()
        })
        .then((container) => {
          return container.stats()
        })
        .then((stats) => {
          stats.pipe.should.be.ok
        })
    })
  })

  describe('#resize', function () {
    it('should resize tty a container', function () {
      this.timeout(70000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('resize') 
      })
        .then((container) => {
          return container.start()
        })
        .then((container) => {
          return container.stats({
            h: process.stdout.rows,
            w: process.stdout.columns
          })
        })
        .then((res) => {
          res.pipe.should.be.ok
        })
    })
  })

  describe('#start', function () {
    it('should start a container', function () {
      this.timeout(70000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('start') 
      })
        .then((container) => {
          return container.start()
        })
        .then((container) => {
          container.should.be.instanceof(Container)
        })
    })
  })

  describe('#stop', function () {
    it('should stop a container', function () {
      this.timeout(70000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('stop') 
      })
        .then((container) => {
          return container.start()
        })
        .then((container) => {
          return container.stop()
        })
        .then((container) => {
          return container.status()
        })
        .then((container) => {
          container.State.Status.should.equal('exited')
        })
    })
  })

  describe('#restart', function () {
    it('should restart a container', function () {
      this.timeout(70000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('restart')
      })
        .then((container) => {
          return container.start()
        })
        .then((container) => {
          return container.restart()
        })
        .then((container) => {
          return container.status()
        })
        .then((container) => {
          container.State.Status.should.equal('running')
        })
    })
  })

  describe('#kill', function () {
    it('should kill a container', function () {
      this.timeout(70000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('kill') 
      })
        .then((container) => {
          return container.start()
        })
        .then((container) => {
          return container.kill()
        })
        .then((container) => {
          return container.status()
        })
        .then((container) => {
          container.State.Status.should.equal('exited')
        })
    })
  })

  describe('#update', function () {
    it('should update a container', function () {
      this.timeout(70000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('update') 
      })
        .then((container) => {
          return container.update({ 'CpuShares': 512 })
        })
        .then((container) => {
          return container.status()
        })
        .then((container) => {
          container.HostConfig.CpuShares.should.equal(512)
        })
    })
  })

  describe('#rename', function () {
    it('should rename a container', function () {
      this.timeout(70000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('rename') + '_prev' 
      })
        .then((container) => {
          return container.rename({ 'name': containerNames.get('rename') })
        })
    })
  })

  describe('#pause', function () {
    it('should pause a container', function () {
      this.timeout(70000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('pause') 
      })
        .then((container) => {
          return container.start()
        })
        .then((container) => {
          return container.pause()
        })
        .then((container) => {
          return container.status()
        })
        .then((container) => {
          container.State.Status.should.equal('paused')
        })
    })
  })

  describe('#unpause', function () {
    it('should unpause a container', function () {
      this.timeout(70000)
      return docker.container.status(containerNames.get('pause'))
        .then((container) => {
          return container.unpause()
        })
        .then((container) => {
          return container.status()
        })
        .then((container) => {
          container.State.Status.should.equal('running')
        })
    })
  })

  describe('#commit', function () {
    it('should commit changes in a container', function () {
      this.timeout(70000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('commit') 
      })
        .then((container) => {
          return container.start()
        })
        .then((container) => {
          return container.commit({ comment: 'commit test' })
        })
        .then((image) => {
          image.should.be.instanceof(Image)
        })
    })
  })

  describe('#exec', function () {
    it('should run exec on a container', function () {
      this.timeout(70000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('exec')
      })
        .then((container) => {
          return container.start()
        })
        .then((container) => {
          return container.exec.create({
            Cmd: [ "top" ]
          })
        })
        .then((exec) => {
          return exec.start()
        })
        .then((stream) => {
          stream.pipe.should.be.ok
        })
    })

    it('should check status of exec on a container', function () {
      this.timeout(70000)
      let Exec
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('inspect_exec')
      })
        .then((container) => {
          return container.start()
        })
        .then((container) => {
          return container.exec.create({
            Cmd: [ "top" ]
          })
        })
        .then((exec) => {
          Exec = exec.constructor
          return exec.status()
        })
        .then((exec) => {
          exec.should.be.instanceof(Exec)
        })
    })
  })

  describe('#attach', function () {
    it('should attach and wait for a container', function () {
      this.timeout(70000)
      return docker.container.create({
        'AttachStdin': false,
        'AttachStdout': true,
        'AttachStderr': true,
        'Tty': false,
        'OpenStdin': false,
        'StdinOnce': false,
        'Env': null,
        'Cmd': ['/bin/bash', '-c', 'uptime'],
        'Dns': ['8.8.8.8', '8.8.4.4'],
        'Image': 'ubuntu',
        name: containerNames.get('attach')
      })
        .then((container) => {
          return container.attach({
            stream: true,
            stdout: true,
            stderr: true
          })
        })
        .then((result) => {
          const [ stream, container ] = result
          stream.should.be.ok

          return container.start()
        })
        .then((container) => {
          return container.wait()
        })
        .then((code) => {
          code.StatusCode.should.be.a('number')
        })
    })
  })

  describe("#archive", function() {
    it("should get an archive inside the container", function() {
      this.timeout(70000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('get_archive') 
      })
        .then((container) => {
          return container.fs.get({ path: '/var/log/dmesg' })
        })
        .then((data) => {
          data.should.be.ok
        })
    });

    it("should put an archive inside the container", function() {
      this.timeout(70000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('put_archive') 
      })
        .then((container) => {
          return container.fs.put('./test/test.tar', {
            path: '/root'
          })
        })
        .then((data) => {
          data.should.be.ok
        })
    });

    it("should inspect an archive inside the container", function() {
      this.timeout(70000)
      return docker.container.create({ 
        Image: 'ubuntu', 
        Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
        name: containerNames.get('info_archive') 
      })
        .then((container) => {
          return container.fs.info({ path: '/var/log/dmesg' })
        })
        .then((data) => {
          data.should.be.ok
        })
    });
  })

  after(function () {
    this.timeout(30000)
    var promises = []
    containerNames.forEach(function (name) {
      promises.push(
        docker.container.stop(name)
          .then((container) => {
            return container.delete({ force: true })
          })
      )
    })
    return Promise.all(promises)
      .catch((err) => console.log(err))
  })
})
