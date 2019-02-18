function progress_bar() {

    let dict = JSON.parse(sessionStorage.getItem("test_case"));
    let len = Object.keys(dict["questions"]).length;
    console.log(len); //9
    console.log(dict);


    let A = [], nextid = -1, next_ind = -1;

    function getDist(req_id) {
        let ret_index = -1;
        for(let i = 0; i < 9; i++) {
            if(dict["questions"][i].id === req_id) {
                ret_index = i;
                break;
            }
        }
        return ret_index;
    }

    function create_mat() {
        for(let i = 0; i < len; i++) {
            let tmp = Array(len+1).fill(0);
            if((dict["questions"][i].answer_type).localeCompare("Objective") === 0) {
                let hset = new Set([]);
                for(let j = 0; j < dict["questions"][i].options.length; j++) {
                     nextid = dict["questions"][i].options[j].next_question_id;
                     if(nextid === null) {
                         tmp[len] = 1;
                     }
                     else if(!hset.has(nextid)) {
                             hset.add(nextid);
                             next_ind = getDist(nextid);
                             tmp[next_ind] = 1;
                     }
                }
            }
            else {
                nextid = dict["questions"][i].options[0].next_question_id;
                if(nextid === null) {
                    tmp[len] = 1;
                }
                else {
                    next_ind = getDist(nextid);
                    tmp[next_ind] = 1;
                }
            }
            A.push(tmp);
        }
        A.push(Array(len+1).fill(0));
    }
    create_mat();

    let dist = Array(len+1).fill(-1);
    dist[len] = 1;

    function longest(start, end) {
        let ld = -1;
        if(dist[start] !== -1) {
            return dist[start];
        }
        if(start === end) {
            return 0;
        }
        for(let i = 0; i<= end; i++) {
            if(A[start][i] === 1) {
                let x = longest(i, end);
                if(x > ld) {
                    ld = x + 1;
                }
            }
        }
        dist[start] = ld;
        return ld;
    }
    longest(0, 9);



    function frame(prog, c) {
        progress.style.width = prog + 'px';
        percent.innerHTML = c + '%';
    }

    function options(ar) {
        let str = "";
        for(let i = 0; i< ar.length; i++) {
            str += "\n" + i + ". " + ar[i]["answer"] + "       ";
        }
        return str;
    }

    let Button = document.querySelector('button');
    let progress = document.querySelector('#progress');
    let percent = document.querySelector('#percentCount');
    let ques = document.querySelector("p");
    let prg = 0, perc = 0, opt = -1, counter = 0;
    let Over = false;
    let type = dict["questions"][counter].answer_type;

    frame(0, 0);
    ques.textContent = dict["questions"][counter].question + "\n" + options(dict["questions"][counter].options);

    Button.addEventListener("click", function () {
        if(!Over) {

            if(type.localeCompare("Objective") === 0) {

                let txt1 = document.getElementById('txt').value;
                let inp = "";
                inp += txt1;
                switch (inp) {
                    case "0":
                        opt = 0;
                        break;
                    case "1":
                        opt = 1;
                        break;
                    case "2":
                        opt = 2;
                        break;
                    case "3":
                        opt = 3;
                        break;
                    case "4":
                        opt = 4;
                        break;
                    case "5":
                        opt = 5;
                        break;
                }

                nextid = dict["questions"][counter].options[opt].next_question_id;
                if(nextid === null) {
                    frame(496, 100);
                    document.querySelector('button').style.display = "none";
                    document.querySelector('input').style.display = "none";
                    ques.textContent = "Thank you ;)";
                    Over = true;
                }
                else {
                    next_ind = getDist(nextid);
                    prg = 62 * (9-dist[next_ind]);
                    perc = 12.5 * (9-dist[next_ind]);
                    frame(prg, perc);
                    counter = next_ind;
                    type = dict["questions"][counter].answer_type;
                    if(type.localeCompare("Objective") === 0) {
                        ques.textContent = dict["questions"][counter].question + "\n" + options(dict["questions"][counter].options);
                    }
                    else {
                        ques.textContent = dict["questions"][counter].question;
                    }
                }

            }

            else {
                let txt1 = document.getElementById('txt').value;
                let inp = "";
                inp += txt1;
                nextid = dict["questions"][counter].options[0].next_question_id;
                if(nextid === null) {
                    frame(496, 100);
                    document.querySelector('button').style.display = "none";
                    document.querySelector('input').style.display = "none";
                    ques.textContent = "Thank you ;)";
                    Over = true;
                }
                else {
                    next_ind = getDist(nextid);
                    prg = 62 * (9-dist[next_ind]);
                    perc = 12.5 * (9-dist[next_ind]);
                    frame(prg, perc);
                    counter = next_ind;
                    type = dict["questions"][counter].answer_type;
                    if(type.localeCompare("Objective") === 0) {
                        ques.textContent = dict["questions"][counter].question + "\n" + options(dict["questions"][counter].options);
                    }
                    else {
                        ques.textContent = dict["questions"][counter].question;
                    }
                }
            }
        }
    });

}

progress_bar();
