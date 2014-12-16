var querypoint = require('kist-querypoint');

querypoint.add('bp-alpha-s','screen and (min-width:600px)');

querypoint.remove('bp-alpha-s');

querypoint.get('bp-alpha-s');

querypoint.get('bp-alpha-s').listen(function ( mq ) {

});

querypoint.get('bp-alpha-s').ignore(function ( mq ) {

});
