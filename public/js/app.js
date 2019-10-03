$(document).ready(function () {

    //all notes get pushed into here
    let notes = [{
        title: "test",
        content: ""
    },
    {
        title: "test",
        content: ""
    },
    {
        title: "test",
        content: ""
    }];

    //the value of the notes in the editor
    let currentIndex = null;

    $(".back-button").hide();
    $(".update-button").hide();
    $(".delete-button").hide();

    $(document).on("click", ".add-note-button", function () {
        $(".add-note-button").hide();
        $(".titles").fadeOut();
        slideLeft();
        backButton();
    });

    $(document).on("click", ".back-button", function () {
        $(".add-note-button").show();
        $(".back-button").hide();
        $(".titles").show();
        slideRight();
    })

    $(document).on("click", ".delete-button", function() {
    
        const index = $(this).data("index");
        currentIndex = index;

        var title = $("#title-name").val();
        var content = $("#write-notes").val();

        $("#title-name").splice(notes[index].title, 1);
        // $("#write-notes").val(notes[index].content);

       
    

  



  renderNotes();

    

    })

    function renderNotes() {
        $(".items").html("");
        for (var i = 0; i < notes.length; i++) {
            $(".items").append('<li><textarea class="items-input" data-index="' + i + '">' + notes[i].title + "\n" + notes[i].content + '</textarea></li>')
        }
    }

    function renderNoteEditor() {
      

    }

    renderNotes();

    $(".save-button").on("click", function (event) {
        event.preventDefault();

        var title = $("#title-name").val();
        var content = $("#write-notes").val();
        console.log(title);
        console.log(content);

        const note = {
            title,
            content
        };

        notes.push(note);

        renderNotes();

        $("#title-name").val("");
        $("#write-notes").val("");
    })
   

    //Title and Name show up again after being clicked

    $(document).on("click", ".items-input", function () {
      
        const index = $(this).data("index");
        currentIndex = index;
       
        $("#title-name").val(notes[index].title);
        $("#write-notes").val(notes[index].content);
        $(".delete-button").show();

       renderNoteEditor();
    });
    

});
 
    // Functions
    function backButton() {
        $(".back-button").show();
    };
    
    function slideLeft() {
        var notes = $(".notes");
        notes.animate({
            right: "215px"
        },
            "slow"
        );
    };
    
    function slideRight() {
        var notes = $(".notes");
        notes.animate({
            right: "0"
        },
            "slow"
        );
    }









