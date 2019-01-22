function progress() {
    let prg = document.querySelector('#progress');
    let percent = document.querySelector('#percentCount');
    let ques = document.querySelector("p");
    let Button = document.querySelector('button');
    let progress = 0, perc = 0;
    let nextid = 0, id = 0;
    let dict = {"questions":[{"id":639,"question":"Did we meet your expectations?","answer_type":"Objective","options":[{"id":843,"answer":"Hell Yeah!","next_question_id":640},{"id":844,"answer":"More or less","next_question_id":640},{"id":845,"answer":"You gotta improve","next_question_id":641}]},{"id":640,"question":"Would you recommend us to your friends and family?","answer_type":"Objective","options":[{"id":846,"answer":"You got it.","next_question_id":642},{"id":847,"answer":"May be","next_question_id":641},{"id":848,"answer":"Nope","next_question_id":641}]},{"id":641,"question":"Help us, where did we miss out?","answer_type":"Objective","options":[{"id":849,"answer":"Our Ambience","next_question_id":642},{"id":850,"answer":"Our Food","next_question_id":642},{"id":851,"answer":"Our Drinks","next_question_id":642},{"id":852,"answer":"Our Service","next_question_id":642},{"id":853,"answer":"Our Deserts","next_question_id":642},{"id":854,"answer":"Other","next_question_id":642}]},{"id":642,"question":"Which of our team members took care of you?","answer_type":"Objective","options":[{"id":855,"answer":"Rachit","next_question_id":643},{"id":856,"answer":"Tam","next_question_id":643},{"id":857,"answer":"Sanjeeb","next_question_id":643},{"id":858,"answer":"Other","next_question_id":643}]},{"id":643,"question":"We have got great offers on the following services, are you interested in finding more about any?","answer_type":"Objective","options":[{"id":859,"answer":"Bread Subscription","next_question_id":644},{"id":860,"answer":"Croissant Subscription","next_question_id":644},{"id":861,"answer":"Cake Delivery","next_question_id":644},{"id":862,"answer":"All of'em","next_question_id":644},{"id":863,"answer":"None","next_question_id":647}]},{"id":646,"question":"Would you mind if we send out offers and our new launches to you?","answer_type":"Objective","options":[{"id":864,"answer":"Yes, keep me updated","next_question_id":null},{"id":865,"answer":"No, Thanks","next_question_id":null}]},{"id":644,"question":"We have special discount for you. To claim, please type in your Email ID below.","answer_type":"Subjective","options":[{"id":null,"answer":null,"next_question_id":645}]},{"id":645,"question":"Your Contact Number to receive the discount code.","answer_type":"OTP","options":[{"id":null,"answer":null,"next_question_id":646}]},{"id":647,"question":"What's your favorite dish you want us to include in our menu","answer_type":"Subjective","options":[{"id":null,"answer":null,"next_question_id":null}]}]};

    function frame(prog, c) {
        progress += prog;
        perc += c;
        prg.style.width = progress + 'px';
        percent.innerHTML = perc + '%';
    }

    function options(ar) {
        let str = "";
        for(let i = 0; i< ar.length; i++) {
            str += i + ". " + ar[i]["answer"] + "       ";
        }
        return str;
    }

    let counter = 7;
    //while(counter <= 8) {
        console.log("counter = " + counter);
        id = dict["questions"][counter].id;
        console.log("id = " + id);
        let type = dict["questions"][counter].answer_type;
        console.log("type = " + type);
        if(type.localeCompare("Objective") === 0) {
            ques.textContent = dict["questions"][counter].question + "\n" + options(dict["questions"][counter].options);
            Button.addEventListener("click", function () {
                let txt1 = document.getElementById('txt').value;
                let inp = "";
                inp += txt1;
                console.log("inside = " + inp);
                nextid = dict["questions"][counter].options[inp].next_question_id;
                console.log("next_id = "+ nextid);
            });
        }
        else {
            ques.textContent = dict["questions"][counter].question;
            Button.addEventListener("click", function () {
                let txt1 = document.getElementById('txt').value;
                let inp = "";
                inp += txt1;
                console.log("inside = " + inp);
                nextid = dict["questions"][counter].options[0].next_question_id;
                console.log("next_id = "+ nextid);
            });
        }
        let dif = nextid-id;
        frame(62 * dif, 12.5 * dif);
        counter += dif;
    //}
}

progress();
