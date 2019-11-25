let router = require('express').Router();
const pg = require('pg');
const connectionString = "postgres://lraxntlfvsjkly:75e354e4ace98cf3dd03931ff2abdba384a52a1a8bdaa704825cecbc93ea6c27@ec2-54-221-215-228.compute-1.amazonaws.com:5432/d7jf0fd377kuvu?ssl=true";

router.get('/', function (req, res) {
    res.json({
       status: 'API Its Working',
       message: 'Vacininha Api!',
    });
});

//CARTEIRINHAS @get
router.get('/carteirinhas', function (req, res) {
    if(req.headers['uid_firebase']){
    pg.connect(connectionString,function(err,client,done) {
        let firebase_id = req.headers['uid_firebase'];//'uXnGHwFxKKaN6cIyVbVWAZnK2fD3';
        if(err){
            res.status(400).send(err);
        } 
        client.query(`SELECT id, full_name, firebase_id, gender_male, photo_url, birth_date
                    FROM "user"
                    WHERE firebase_id = '${firebase_id}'`, 
        function(err,result) {
            done(); // closing the connection;
            if(err){
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        });
     });
    }else{
        res.status(400).send('You should pass the correct parameters');
    }
});

//CARTEIRINHAS @post
router.post('/carteirinhas', function (req, res) {
    if(req.headers['uid_firebase']){
    pg.connect(connectionString,function(err,client,done) {
        let firebase_id = req.headers['uid_firebase'];//'uXnGHwFxKKaN6cIyVbVWAZnK2fD3';
        console.log(req.body.name)
        let name = req.body.name;
        let gender_male = req.body.genero;
        let photo_url = req.body.photo_url;
        let birth_date = req.body.birth_date;

        if(err){
            res.status(400).send(err);
        }
        let sql = `
            INSERT INTO public."user"
            (full_name, firebase_id, gender_male, photo_url, birth_date)
            VALUES('${name}', '${firebase_id}', '${gender_male}', '${photo_url}', '${birth_date}');
            ` 
        client.query(sql, 
        function(err,result) {
            done(); // closing the connection;
            if(err){
                res.status(400).send(err);
            }
            res.status(200).send(result);
        });
     });
    }else{
        res.status(400).send('You should pass the correct parameters');
    }
});

//VACINAS @get
router.get('/vacinas/:idCarteira', function (req, res) {
    if(req.headers['uid_firebase']){
        //let intArray = req.query.id_ingredient.map(Number);
    let firebase_id = req.headers['uid_firebase'];//'uXnGHwFxKKaN6cIyVbVWAZnK2fD3';
    let user_id = req.params.idCarteira;
    pg.connect(connectionString,function(err,client,done) {
        if(err){
            console.log("not able to get connection "+ err);
            res.status(400).send(err);
        }  
        let select =    `
                select t1.vaccine_id, t1.name, t1.description, vaccine_date, vaccines_applied.date as appliapplication_date, case when vaccines_applied.date is null then false else true end as has_applied
                from
                (SELECT "user".id as user_id,
                vaccines.id as vaccine_id, name, description, (birth_date + INTERVAL '1 month'*apply_month) as vaccine_date 
                FROM public."user", vaccines 
                where firebase_id = '${firebase_id}' and  "user".id = '${user_id}') as t1 
                left join vaccines_applied on t1.vaccine_id = vaccines_applied.vaccine_id and vaccines_applied.user_id = t1.user_id`;
        console.log(select)
        client.query(select, 
        function(err,result) {
            done(); // closing the connection;
            if(err){
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        });
    
     });
    }else{
        res.status(400).send('You should pass the correct parameters');
    }

});

//VACINAS @post
router.post('/vacinas', function (req, res) {
    if(req.headers['uid_firebase'] && req.body){
    pg.connect(connectionString,function(err,client,done) {
        let user_id = req.body.user_id;
        let vaccine_id = req.body.vaccine_id;
        let date = req.body.date;
        if(!user_id || !vaccine_id || !date){
            res.status(400).send('You are missing some Parameters');
        }
        console.log("RESP = " + res.body)
        if(err){
            res.status(400).send(err);
        }
        let sql = `
        INSERT INTO public.vaccines_applied
        ("date", user_id, vaccine_id)
        VALUES('${date}', ${user_id}, ${vaccine_id});`
        
        client.query(sql, 
        function(err,result) {
            done(); // closing the connection;
            if(err){
                res.status(400).send(err);
            }
            res.status(200).send(result);
        });
     });
    }else{
        res.status(400).send('You should pass the correct parameters');
    }
});

//MEDIDAS @get
router.get('/medidas/:idCarteira', function (req, res) {
    if(req.headers['uid_firebase']){
        //let intArray = req.query.id_ingredient.map(Number);
    let firebase_id = req.headers['uid_firebase'];//'uXnGHwFxKKaN6cIyVbVWAZnK2fD3';
    let user_id = req.params.idCarteira;
    pg.connect(connectionString,function(err,client,done) {
        if(err){
            console.log("not able to get connection "+ err);
            res.status(400).send(err);
            console.log(user_id);
        }  
        let select =`SELECT * FROM public.measures_table WHERE user_id = ${user_id}`;
        client.query(select, 
        function(err,result) {
            done(); // closing the connection;
            if(err){
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        });
    
     });
    }else{
        res.status(400).send('You should pass the correct parameters');
    }

});

//MEDIDAS @post
router.post('/medidas', function (req, res) {
    if(req.headers['uid_firebase'] && req.body){
        //let intArray = req.query.id_ingredient.map(Number);
    let firebase_id = req.headers['uid_firebase'];//'uXnGHwFxKKaN6cIyVbVWAZnK2fD3';
    let user_id = req.body.user_id;
    let height = req.body.height;
    let weight = req.body.weight;
    let date = req.body.date;
    if(!user_id || !height || !weight || !date){
        res.status(400).send('You should pass the correct parameters');
    }
    pg.connect(connectionString,function(err,client,done) {
        if(err){
            console.log("not able to get connection "+ err);
            res.status(400).send(err);
            console.log(user_id);
        }  
        let select =`INSERT INTO public.measures_table
        (user_id, weight, height, "date")
        VALUES(${user_id}, ${height} , ${weight} , '${date}');
        `;

        client.query(select, 
        function(err,result) {
            done(); // closing the connection;
            if(err){
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result.rows);
        });
    
     });
    }else{
        res.status(400).send('You should pass the correct parameters');
    }

});

module.exports = router;