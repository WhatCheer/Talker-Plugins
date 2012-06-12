// We missed the /play commands from Campfire, so we implemented them for Talker

plugin.Play = {}

plugin.Play.sounds = {
  'greatjob': ['//apps.whatcheerinc.com/talker/greatjob.mp3','Great Job!'],
  'rimshot': ['//apps.whatcheerinc.com/talker/rimshot.mp3','Rimshot!'],
  'hiyoooo': ['//apps.whatcheerinc.com/talker/hiyoooo.mp3','Hiyoooo!'],
  'sadtrombone': ['//apps.whatcheerinc.com/talker/sadtrombone.mp3','Sad Trombone'],
  'tada': ['//apps.whatcheerinc.com/talker/tada.mp3','Tada!']
};

plugin.Play.loaded = Math.round(new Date().getTime() / 1000);

plugin.onMessageInsertion = function(event) {
  var element = Talker.getLastInsertion();
  if( parseInt(element.attr('time')) > plugin.Play.loaded ) {
    jQuery.each( plugin.Play.sounds, function ( i, e ) {
      element.replace(':play_' + i + ':', '<audio src="' + e[0] + '" autoplay="autoplay"></audio>');
    } );
  }
  else {
    jQuery.each( plugin.Play.sounds, function ( i, e ) {
      element.replace(':play_' + i + ':', '');
    } );
  }
};

plugin.onCommand = function (event) {
  if(event.command == "play") {
    if(event.args.length > 0 && event.args[0] in plugin.Play.sounds) {
      Talker.getMessageBox().val('');
      Talker.sendMessage(':play_' + event.args[0] + ': ' + plugin.Play.sounds[event.args[0]][1]);
      return false;
    }
  }
};
