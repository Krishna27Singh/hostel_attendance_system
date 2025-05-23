const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const bcrypt = require('bcrypt');
const User = require('../models/User');

passport.use(new LocalStrategy(
    async(username,password, done)=>{
        try{
            const user = await User.findOne({username});
            if(!user) return done(null,false,{message:"user not found"});

            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch) return done(null,user);
            else return done(null,false,{message:"Incorrect password"});
        }catch(error){
            return done(err);
        }
     
    }
  ));

  passport.serializeUser((user,done)=>{
    console.log("we are inside serializeUser");
    done(null,user._id);
  });
  passport.deserializeUser(async(_id,done)=>{
    try{
        console.log("we are inside deserializeUser");
        const user = await User.findById(_id);
        done(null,user)
    }catch(error){
        done(error);
    }
  })

