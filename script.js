function progress_bar() {

    let A = [
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    let dist = [-1, -1, -1, -1, -1, -1, -1, -1, -1, 1];

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

    let dict = {"questions":[{"id":639,"question":"Did we meet your expectations?","answer_type":"Objective","options":[{"id":843,"answer":"Hell Yeah!","next_question_id":640},{"id":844,"answer":"More or less","next_question_id":640},{"id":845,"answer":"You gotta improve","next_question_id":641}]},{"id":640,"question":"Would you recommend us to your friends and family?","answer_type":"Objective","options":[{"id":846,"answer":"You got it.","next_question_id":642},{"id":847,"answer":"May be","next_question_id":641},{"id":848,"answer":"Nope","next_question_id":641}]},{"id":641,"question":"Help us, where did we miss out?","answer_type":"Objective","options":[{"id":849,"answer":"Our Ambience","next_question_id":642},{"id":850,"answer":"Our Food","next_question_id":642},{"id":851,"answer":"Our Drinks","next_question_id":642},{"id":852,"answer":"Our Service","next_question_id":642},{"id":853,"answer":"Our Deserts","next_question_id":642},{"id":854,"answer":"Other","next_question_id":642}]},{"id":642,"question":"Which of our team members took care of you?","answer_type":"Objective","options":[{"id":855,"answer":"Rachit","next_question_id":643},{"id":856,"answer":"Tam","next_question_id":643},{"id":857,"answer":"Sanjeeb","next_question_id":643},{"id":858,"answer":"Other","next_question_id":643}]},{"id":643,"question":"We have got great offers on the following services, are you interested in finding more about any?","answer_type":"Objective","options":[{"id":859,"answer":"Bread Subscription","next_question_id":644},{"id":860,"answer":"Croissant Subscription","next_question_id":644},{"id":861,"answer":"Cake Delivery","next_question_id":644},{"id":862,"answer":"All of'em","next_question_id":644},{"id":863,"answer":"None","next_question_id":647}]},{"id":646,"question":"Would you mind if we send out offers and our new launches to you?","answer_type":"Objective","options":[{"id":864,"answer":"Yes, keep me updated","next_question_id":null},{"id":865,"answer":"No, Thanks","next_question_id":null}]},{"id":644,"question":"We have special discount for you. To claim, please type in your Email ID below.","answer_type":"Subjective","options":[{"id":null,"answer":null,"next_question_id":645}]},{"id":645,"question":"Your Contact Number to receive the discount code.","answer_type":"OTP","options":[{"id":null,"answer":null,"next_question_id":646}]},{"id":647,"question":"What's your favorite dish you want us to include in our menu","answer_type":"Subjective","options":[{"id":null,"answer":null,"next_question_id":null}]}]};
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

                let nextid = dict["questions"][counter].options[opt].next_question_id;
                if(nextid === null) {
                    frame(496, 100);
                    document.querySelector('button').style.display = "none";
                    document.querySelector('input').style.display = "none";
                    ques.textContent = "Thank you ;)";
                    Over = true;
                }
                else {
                    let next_ind = getDist(nextid);
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
                let nextid = dict["questions"][counter].options[0].next_question_id;
                if(nextid === null) {
                    frame(496, 100);
                    document.querySelector('button').style.display = "none";
                    document.querySelector('input').style.display = "none";
                    ques.textContent = "Thank you ;)";
                    Over = true;
                }
                else {
                    let next_ind = getDist(nextid);
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
