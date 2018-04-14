$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); // function for MaterializeCSS parallax componenet
    $('.tooltipped').tooltip({ // delay function for button tool tips
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { // fade in page elements
        // fadeIn function
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    var congratsMessages = ['Great', "Lion Power!"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "This animal spends most of its day up in a comfortable tree. It will even carry its prey up there so other contenders will have a difficult time stealing it.?",
            "c": ["Lion", "Leopard", "Cheetah"],
            "answer": 1
        },
        // question 2
        {
            "q": "This animal must splay its legs very wide in order to drink from a water source. This animal also has beautiful eyes!",
            "c": ["Giraffe", "Antelope", "Zebra"],
            "answer": 0
        },
        // question 3
        {
            "q": "In the movies, Tarzan had one which saved his life a few times!",
            "c": ["Lion", "Chimpanzee", "Baboon"],
            "answer": 1
        },
        // question 4
        {
            "q": "This animal will 'spronk' when frightened and is the favourite food of cheetahs.",
            "c": ["Sable", "Eland", "Thompson's Gazelle"],
            "answer": 2
        },
        // question 5
        {
            "q": "The females of this animal do the hunting and killing of prey in a cooperative fashion. They are wonderful mothers and providers. The male, however, is always first in line to eat!",
            "c": ["Lion", "Tiger", "Lynx"],
            "answer": 1
        },
        // question 6
        {
            "q": "This animal will compete with lions for live kills and is not the scavenger that history has made it out to be.",
            "c": ["Hyena", "Jackal", "African Wild Dog"],
            "answer": 0
        },
        // question 7
        {
            "q": "This animal can live as long as or longer than a human, is genuinely affectionate and curious and if you own one as a pet you know it can be very boisterous and make quite a mess.",
            "c": ["Budgerigar", "Cockatiel", "Mynah"],
            "answer": 1
        },
        // question 8
        {
            "q": "This animal has notoriously bad eyesight, but will charge when it feels threatened and at close range can do a great deal of damage.",
            "c": ["Bear", "Alligator", "Crocodile"],
            "answer": 2
        },
        // question 9
        {
            "q": "This is a herd animal. Every year there is a great migration of these animals to feeding and birthing grounds. They will overcome great obstacles such as rain-swollen rivers and crocodile attacks to reach their destination. Many who are not strong enough to make the journey die along the way.",
            "c": ["Zebra", "Giraffe", "Wildebeest"],
            "answer": 2
        },
        // question 10
        {
            "q": "There are many different species of this bird, which is nature's 'cleaning crew'. They are very good at what they do!",
            "c": ["Gull", "Vulture", "Hawk"],
            "answer": 1
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops the game
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});