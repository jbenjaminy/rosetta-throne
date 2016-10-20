exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                       (process.env.NODE_ENV === 'production' ?
                         'mongodb://newuser:rosettathrone@ds063186.mlab.com:63186/rosetta-throne' :
                         'mongodb://newuser:rosettathrone@ds063186.mlab.com:63186/rosetta-throne');

exports.PORT = process.env.PORT || 8080;