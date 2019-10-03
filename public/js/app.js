$(document).ready(function () {

    //all notes get pushed into here
    let notes = []

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

    $(document).on("click", ".delete-button", function() {
        notes.splice(currentIndex, 1);
        renderNotes(); 
        clearValue(); 
    })
    
    $(document).on("click", ".back-button", function () {
        backButtonandSave();
    })
    
    $(document).on("click", ".add-code-button", function () {
       $(".notes").hide();
       
    })



    function renderNotes() {
        $(".items").html("");
        for (var i = 0; i < notes.length; i++) {
            $(".items").append('<li><textarea class="items-input" data-index="' + i + '">' + notes[i].title + "\n" + notes[i].content + '</textarea></li>')
        }
    }

    //updating the notes
    function renderNoteEditor() {
      

    }

    renderNotes();

    $(".save-button").on("click", function (event) {
        event.preventDefault();

        var title = $("#title-name").val();
        var content = $("#write-notes").val();
     
        const note = {
            title,
            content
        };

        notes.push(note);

        renderNotes();
        backButtonandSave(); 
        clearValue();    
    })
   
    //Title and Name show up again after being clicked
    $(document).on("click", ".items-input", function () {
      
        const index = $(this).data("index");
        currentIndex = index;
        console.log("second check" + index)
       
        $("#title-name").val(notes[index].title);
        $("#write-notes").val(notes[index].content);
        $(".delete-button").show();

       renderNoteEditor();
    });
});
 
    // Functions
    function backButtonandSave() {
        $(".add-note-button").show();
        $(".back-button").hide();
        $(".titles").show();
        slideRight();
    }
    
    function clearValue() {
        $("#title-name").val("");
        $("#write-notes").val("");
    }

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









