const Router = require('koa-router');
const router = new Router();
const model = require('./rhinoceros');
const bodyParser = require('koa-bodyparser');

router.use(bodyParser());


// Show the entire rhinoceros party
router.get('/rhinoceros', (ctx, next) => {
  const rhinoceroses = model.getAll();
  ctx.response.body = { rhinoceroses };
});

router.get(
  '/rhinoceros/:id',
  (ctx, next) => {
   const rhinoceroses = model.getAll();

    // Search for waldo see if the is found
   let found = rhinoceroses.find((el,i) => {
      return el.id === ctx.params.id
   })

  //  A simple check for that edge case
   if(found.length === 0){
      ctx.response.body = 'Not a valid ID'
   } else {
      ctx.response.body = found
   }
  }
);


router.get('/', (ctx) => {
  ctx.response.body = 'You are home'
})


router.get('/endangered', (ctx) => {
  const rhinoceroses = model.getAll();

  // Find the count of objects. 
  const count = {}
  for (var i = 0; i < rhinoceroses.length; i++) {
    count[rhinoceroses[i]['species']] = 1 + (count[rhinoceroses[i]['species']] || 0);
  }

  // Filter count object for only endangered 
  Object.filter = (obj, predicate) => 
  Object.keys(obj).filter( key => predicate(obj[key])).reduce( (res, key) => (res[key] = obj[key], res), {} );
  let filtered = Object.filter(count, count => count === 1 || count === 2); 


  // post endagered animal 
  ctx.response.body = rhinoceroses.filter(function(item) {
    return Object.keys(filtered).indexOf(item.species) !== -1;
  });

})


router.post('/rhinoceros', (ctx, next) => {
  const body = ctx.request.body


  // Simple if condition to check for validation
  if(noAdditionalKeys(body) && validatePropName(body) && validateLength(body)){
      ctx.response.body = model.newRhinoceros(ctx.request.body);
      ctx.status = 200;
  } else {
      ctx.status = 401;
      ctx.response.body = 'forbidden';
  }
});


// ##TODO move to validation file
// Seperate functions for each validation
function validateLength(ctx){
  return ctx['name'].length > 1
}

function validatePropName(ctx){
  const names = [`white_rhinoceros`, `black_rhinoceros`, `indian_rhinoceros`, `javan_rhinoceros`, `sumatran_rhinoceros`]
  return names.includes(ctx['species'])
}

function noAdditionalKeys(ctx){
  return ctx.hasOwnProperty('species') && ctx.hasOwnProperty('name') && Object.keys(ctx).length === 2
}





module.exports = router;
