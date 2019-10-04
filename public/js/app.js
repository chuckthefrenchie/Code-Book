// import { json } from "sequelize/types";

$(document).ready(function() {
  //all notes get pushed into here
  let notes = [];

  //the value of the notes in the editor
  let currentIndex = null;

  $(".back-button").hide();
  $(".update-button").hide();
  $(".delete-button").hide();

  $(document).on("click", ".add-note-button", function() {
    $(".add-note-button").hide();
    $(".titles").fadeOut();
    slideLeft();
    backButton();
  });

  $(document).on("click", ".delete-button", function() {
    notes.splice(currentIndex, 1);
    renderNotes();
    clearValue();
  });

  $(document).on("click", ".back-button", function() {
    backButtonandSave();
  });

  $(document).on("click", ".add-code-button", function() {
    $(".notes").hide();
  });

  function renderNotes() {
    $(".items").html("");
    for (var i = 0; i < notes.length; i++) {
      $(".items").append(
        "<li><textarea class=\"items-input\" data-index=\"" +
          i +
          "\">" +
          notes[i].title +
          "\n" +
          notes[i].content +
          "</textarea></li>"
      );
    }
  }

  //updating the notes
  function renderNoteEditor() {}

  renderNotes();

  $(".save-button").on("click", function(event) {
    event.preventDefault();

    var title = $("#title-name").val();
    var body = $("#write-notes").val();

    const note = {
      title,
      body
    };

    // notes.push(note);

    submitNote(note);
    renderNotes();
    backButtonandSave();
    clearValue();

  });

  //Title and Name show up again after being clicked
  $(document).on("click", ".items-input", function() {
    const index = $(this).data("index");
    currentIndex = index;
    console.log("second check" + index);

    $("#title-name").val(notes[index].title);
    $("#write-notes").val(notes[index].content);
    $(".delete-button").show();

    renderNoteEditor();
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
  }

  function slideLeft() {
    var notes = $(".notes");
    notes.animate(
      {
        right: "215px"
      },
      "slow"
    );
  }

  function slideRight() {
    var notes = $(".notes");
    notes.animate(
      {
        right: "0"
      },
      "slow"
    );
  }

  //// SENDING INFO TO BACK END

  var titleInput = $("#title-name");
  var bodyInput = $("#write-notes");
  var noteId;
  var updating = false;

  //   if (url.indexOf("?post_id=") !== -1) {
  //     noteId = url.split("=")[1];
  //     getNoteData(noteId);
  //   }

  // getNoteData(noteId);
  getNoteData();

  $(".save-button").on("click", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (titleInput.val().trim() === "" || bodyInput.val().trim() === "") {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newNote = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim()
    };

    console.log(newNote);

    // If we're updating a post run updateNote to update a note
    // Otherwise run submitNote to create a whole new post
    if (updating) {
      newNote.id = noteId;
      updateNote(newNote);
    } else {
      submitNote(newNote);
    }
  });

  // Gets post data for a post if we're editing
  // function getNoteData(id) {
  //   $.get("/api/notes/" + id, function(data) {
  //     if (data) {
  //       titleInput.val(data.title);
  //       bodyInput.val(data.body);
  //       // If we have a post with this id, set a flag for us to know to update the post
  //       // when we hit submit
  //       updating = true;
  //     }
  //   });
  // }

  function getNoteData() {
    fetch("http://localhost:3000/api/user/notes")
      .then(res => res.json())
      .then(data => data.map(item => notes.push(item)))
      // .then(data => {
      //     titleInput.val(data.title);
      //     bodyInput.val(data.body);
      //     // If we have a post with this id, set a flag for us to know to update the post
      //     // when we hit submit
      //     updating = true;
      // })
      .then(renderNotes)
      .catch(err => console.error(err));
  }

  ///saving the note

  // Submits a new post and brings user to blog page upon completion
  // eslint-disable-next-line no-unused-vars
  function submitNote(note) {
    // $.post("/api/notes/", Note, function() {
    //   window.location.reload();
    // });
    console.log(note);
    fetch("http://localhost:3000/api/user/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note)
    })
      .then(res => res.json())
      .then(renderNotes);
  }

  // function submitNote(note) {
  //   $.ajax({
  //     method: "POST",
  //     url: "/api/notes",
  //     data: note
  //   }).then(function() {
  //     window.location.href = "/index";
  //   });
  // }
}); // to close document ready function
