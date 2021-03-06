const tmi = require('../src/index.js');

const events = [
  {
    name: 'action',
    data:
      '@badges=broadcaster/1,warcraft/horde;color=#0D4200;display-name=Schmoopiie;emotes=25:0-4,12-16/1902:6-10;subscriber=0;turbo=1;user-type=global_mod :schmoopiie!~schmoopiie@schmoopiie.tmi.twitch.tv PRIVMSG #schmoopiie :\u0001ACTION Hello :)\u0001',
    expected: [
      '#schmoopiie',
      {
        badges: { broadcaster: '1', warcraft: 'horde' },
        color: '#0D4200',
        'display-name': 'Schmoopiie',
        emotes: {
          25: ['0-4', '12-16'],
          1902: ['6-10'],
        },
        subscriber: false,
        turbo: true,
        'user-type': 'global_mod',
        'emotes-raw': '25:0-4,12-16/1902:6-10',
        'badges-raw': 'broadcaster/1,warcraft/horde',
        username: 'schmoopiie',
        'message-type': 'action',
      },
      'Hello :)',
    ],
  },
  {
    name: 'ban',
    data:
      '@ban-reason=this\\sis\\sa\\stest :tmi.twitch.tv CLEARCHAT #schmoopiie :schmoopiie',
    expected: ['#schmoopiie', 'schmoopiie', 'this is a test'],
  },
  {
    name: 'chat',
    data:
      '@badges=broadcaster/1,warcraft/horde;color=#0D4200;display-name=Schmoopiie;emotes=25:0-4,12-16/1902:6-10;subscriber=0;turbo=1;user-type=global_mod :schmoopiie!~schmoopiie@schmoopiie.tmi.twitch.tv PRIVMSG #schmoopiie :Hello :)',
    expected: [
      '#schmoopiie',
      {
        badges: { broadcaster: '1', warcraft: 'horde' },
        color: '#0D4200',
        'display-name': 'Schmoopiie',
        emotes: {
          25: ['0-4', '12-16'],
          1902: ['6-10'],
        },
        subscriber: false,
        turbo: true,
        'user-type': 'global_mod',
        'emotes-raw': '25:0-4,12-16/1902:6-10',
        'badges-raw': 'broadcaster/1,warcraft/horde',
        username: 'schmoopiie',
        'message-type': 'chat',
      },
      'Hello :)',
    ],
  },
  {
    name: 'cheer',
    data:
      '@badges=broadcaster/1,warcraft/horde;color=#0D4200;bits=100;display-name=Schmoopiie;emotes=;subscriber=0;turbo=1;user-type=global_mod :schmoopiie!~schmoopiie@schmoopiie.tmi.twitch.tv PRIVMSG #schmoopiie :cheer100 Hello :)',
    expected: [
      '#schmoopiie',
      {
        badges: { broadcaster: '1', warcraft: 'horde' },
        bits: '100',
        color: '#0D4200',
        'display-name': 'Schmoopiie',
        emotes: null,
        subscriber: false,
        turbo: true,
        'user-type': 'global_mod',
        'emotes-raw': null,
        'badges-raw': 'broadcaster/1,warcraft/horde',
        username: 'schmoopiie',
      },
      'cheer100 Hello :)',
    ],
  },
  {
    name: 'clearchat',
    data: ':tmi.twitch.tv CLEARCHAT #schmoopiie',
    expected: ['#schmoopiie'],
  },
  {
    name: 'connected',
    data:
      ':tmi.twitch.tv 372 schmoopiie :You are in a maze of twisty passages, all alike.',
  },
  {
    name: 'emotesets',
    data:
      '@color=#1E90FF;display-name=Schmoopiie;emote-sets=0;turbo=0;user-type= :tmi.twitch.tv GLOBALUSERSTATE',
    expected: ['0'],
  },
  {
    name: 'hosted',
    data:
      ':jtv!~jtv@jtv.tmi.twitch.tv PRIVMSG #schmoopiie :Username is now hosting you for 11 viewers.',
    expected: ['#schmoopiie', 'username', 11],
  },
  {
    name: 'hosting',
    data: ':tmi.twitch.tv HOSTTARGET #schmoopiie :schmoopiie 3',
    expected: ['#schmoopiie', 'schmoopiie', 3],
  },
  {
    name: 'join',
    data: ':schmoopiie!schmoopiie@schmoopiie.tmi.twitch.tv JOIN #schmoopiie',
    expected: ['#schmoopiie', 'schmoopiie', false],
  },
  {
    name: 'mod',
    data: ':jtv MODE #schmoopiie +o schmoopiie',
    expected: ['#schmoopiie', 'schmoopiie'],
  },
  {
    name: 'mods',
    data:
      '@msg-id=room_mods :tmi.twitch.tv NOTICE #schmoopiie :The moderators of this room are: user1, user2, user3',
    expected: ['#schmoopiie', ['user1', 'user2', 'user3']],
  },
  {
    name: 'part',
    data: ':schmoopiie!schmoopiie@schmoopiie.tmi.twitch.tv PART #schmoopiie',
    expected: ['#schmoopiie', 'schmoopiie', false],
  },
  {
    name: 'ping',
    data: 'PING :tmi.twitch.tv',
  },
  {
    name: 'pong',
    data: 'PONG :tmi.twitch.tv',
  },
  {
    name: 'r9kbeta',
    data:
      '@msg-id=r9k_on :tmi.twitch.tv NOTICE #schmoopiie :This room is now in r9k mode.',
    expected: ['#schmoopiie', true],
  },
  {
    name: 'r9kbeta',
    data:
      '@msg-id=r9k_off :tmi.twitch.tv NOTICE #schmoopiie :This room is no longer in r9k mode.',
    expected: ['#schmoopiie', false],
  },
  {
    name: 'roomstate',
    data:
      '@broadcaster-lang=;r9k=0;slow=0;subs-only=0 :tmi.twitch.tv ROOMSTATE #schmoopiie',
    expected: [
      '#schmoopiie',
      {
        'broadcaster-lang': null,
        r9k: false,
        slow: false,
        'subs-only': false,
        channel: '#schmoopiie',
      },
    ],
  },
  {
    name: 'slowmode',
    data: '@slow=8 :tmi.twitch.tv ROOMSTATE #schmoopiie',
    expected: ['#schmoopiie', true, 8],
  },
  {
    name: 'slowmode',
    data: '@slow=0 :tmi.twitch.tv ROOMSTATE #schmoopiie',
    expected: ['#schmoopiie', false, 0],
  },
  {
    name: 'subanniversary',
    data:
      '@badges=staff/1,subscriber/6,turbo/1;color=#008000;display-name=Schmoopiie;emotes=;mod=0;msg-id=resub;msg-param-months=6;room-id=20624989;subscriber=1;msg-param-sub-plan=Prime;msg-param-sub-plan-name=Channel\\sSubscription\\s(Schmoopiie);system-msg=Schmoopiie\\shas\\ssubscribed\\sfor\\s6\\smonths!;login=schmoopiie;turbo=1;user-id=20624989;user-type=staff :tmi.twitch.tv USERNOTICE #schmoopiie :Great stream -- keep it up!',
    expected: [
      '#schmoopiie',
      'Schmoopiie',
      6,
      'Great stream -- keep it up!',
      {
        badges: { staff: '1', subscriber: '6', turbo: '1' },
        'badges-raw': 'staff/1,subscriber/6,turbo/1',
        color: '#008000',
        'display-name': 'Schmoopiie',
        emotes: null,
        'emotes-raw': null,
        login: 'schmoopiie',
        'message-type': 'resub',
        mod: false,
        'msg-id': 'resub',
        'msg-param-months': '6',
        'msg-param-sub-plan': 'Prime',
        'msg-param-sub-plan-name': 'Channel\\sSubscription\\s(Schmoopiie)',
        'room-id': '20624989',
        subscriber: true,
        'system-msg': 'Schmoopiie\\shas\\ssubscribed\\sfor\\s6\\smonths!',
        turbo: true,
        'user-id': '20624989',
        'user-type': 'staff',
      },
      {
        prime: true,
        plan: 'Prime',
        planName: 'Channel Subscription (Schmoopiie)',
      },
    ],
  },
  {
    name: 'resub',
    data:
      '@badges=staff/1,subscriber/6,turbo/1;color=#008000;display-name=Schmoopiie;emotes=;mod=0;msg-id=resub;msg-param-months=6;room-id=20624989;subscriber=1;msg-param-sub-plan=Prime;msg-param-sub-plan-name=Channel\\sSubscription\\s(Schmoopiie);system-msg=Schmoopiie\\shas\\ssubscribed\\sfor\\s6\\smonths!;login=schmoopiie;turbo=1;user-id=20624989;user-type=staff :tmi.twitch.tv USERNOTICE #schmoopiie :Great stream -- keep it up!',
    expected: [
      '#schmoopiie',
      'Schmoopiie',
      6,
      'Great stream -- keep it up!',
      {
        badges: { staff: '1', subscriber: '6', turbo: '1' },
        'badges-raw': 'staff/1,subscriber/6,turbo/1',
        color: '#008000',
        'display-name': 'Schmoopiie',
        emotes: null,
        'emotes-raw': null,
        login: 'schmoopiie',
        'message-type': 'resub',
        mod: false,
        'msg-id': 'resub',
        'msg-param-months': '6',
        'msg-param-sub-plan': 'Prime',
        'msg-param-sub-plan-name': 'Channel\\sSubscription\\s(Schmoopiie)',
        'room-id': '20624989',
        subscriber: true,
        'system-msg': 'Schmoopiie\\shas\\ssubscribed\\sfor\\s6\\smonths!',
        turbo: true,
        'user-id': '20624989',
        'user-type': 'staff',
      },
      {
        prime: true,
        plan: 'Prime',
        planName: 'Channel Subscription (Schmoopiie)',
      },
    ],
  },
  {
    name: 'subscribers',
    data:
      '@msg-id=subs_on :tmi.twitch.tv NOTICE #schmoopiie :This room is now in subscribers-only mode.',
    expected: ['#schmoopiie', true],
  },
  {
    name: 'subscribers',
    data:
      '@msg-id=subs_off :tmi.twitch.tv NOTICE #schmoopiie :This room is no longer in subscribers-only mode.',
    expected: ['#schmoopiie', false],
  },
  {
    name: 'subscription',
    data:
      '@badges=subscriber/0,premium/1;color=;display-name=Schmoopiie;emotes=;id=3c472723-4a8d-4c40-87aa-8c351db3c518;login=schmoopiie;mod=0;msg-id=sub;msg-param-months=1;msg-param-sub-plan-name=Channel\\sSubscription\\s(Schmoopiie);msg-param-sub-plan=Prime;room-id=26610234;subscriber=0;system-msg=Schmoopiie\\sjust\\ssubscribed\\swith\\sTwitch\\sPrime!;tmi-sent-ts=1503243634748;turbo=0;user-id=20624989;user-type= :tmi.twitch.tv USERNOTICE #schmoopiie',
    expected: [
      '#schmoopiie',
      'Schmoopiie',
      {
        prime: true,
        plan: 'Prime',
        planName: 'Channel Subscription (Schmoopiie)',
      },
      null,
      {
        badges: { subscriber: '0', premium: '1' },
        color: null,
        'display-name': 'Schmoopiie',
        emotes: null,
        id: '3c472723-4a8d-4c40-87aa-8c351db3c518',
        login: 'schmoopiie',
        mod: false,
        'msg-id': 'sub',
        'msg-param-months': true,
        'msg-param-sub-plan-name': 'Channel\\sSubscription\\s(Schmoopiie)',
        'msg-param-sub-plan': 'Prime',
        'room-id': '26610234',
        subscriber: false,
        'system-msg': 'Schmoopiie\\sjust\\ssubscribed\\swith\\sTwitch\\sPrime!',
        'tmi-sent-ts': '1503243634748',
        turbo: false,
        'user-id': '20624989',
        'user-type': null,
        'emotes-raw': null,
        'badges-raw': 'subscriber/0,premium/1',
        'message-type': 'sub',
      },
    ],
  },
  {
    name: 'timeout',
    data:
      '@ban-duration=60;ban-reason=this\\sis\\sa\\stest :tmi.twitch.tv CLEARCHAT #schmoopiie :schmoopiie',
    expected: ['#schmoopiie', 'schmoopiie', 'this is a test', 60],
  },
  {
    name: 'unhost',
    data: ':tmi.twitch.tv HOSTTARGET #schmoopiie :- 0',
    expected: ['#schmoopiie', 0],
  },
  {
    name: 'unmod',
    data: ':jtv MODE #schmoopiie -o schmoopiie',
    expected: ['#schmoopiie', 'schmoopiie'],
  },
  {
    name: 'whisper',
    data:
      '@color=#FFFFFF;display-name=Schmoopiie;emotes=;turbo=1;user-type= :schmoopiie!schmoopiie@schmoopiie.tmi.twitch.tv WHISPER martinlarouche :Hello! ;-)',
    expected: [
      '#schmoopiie',
      {
        color: '#FFFFFF',
        'display-name': 'Schmoopiie',
        emotes: null,
        turbo: true,
        'user-type': null,
        'emotes-raw': null,
        username: 'schmoopiie',
        'message-type': 'whisper',
      },
      'Hello! ;-)',
      false,
    ],
  },
];

describe('client events', () => {
  events.forEach(e => {
    const name = e.name;
    const data = e.data;
    const expected = e.expected;
    it(`should emit ${name}`, cb => {
      const client = new tmi.client();

      client.on(name, (...args) => {
        'Should have reached this callback'.should.be.ok();
        if (expected) {
          expected.forEach((d, index) => {
            if (args[index] === null) {
              /*
                        *  null is a special case for deep object comparison
                        *  using should.
                        *  Since null is not an object, we cannot call
                        *  null.should
                        * */
              (args[index] === d).should.be.true();
            } else args[index].should.eql(d);
          });
        }
        cb();
      });

      client._onMessage({ data });
    });
  });

  it('should emit disconnected', cb => {
    const client = new tmi.client();

    client.on('disconnected', reason => {
      reason.should.be.exactly('Connection closed.').and.be.a.String();
      cb();
    });

    client.log.error = function noop() {};
    client._onError();
  });
});
