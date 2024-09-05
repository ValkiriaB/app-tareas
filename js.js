function $(element) {
  return document.querySelector(element);
}

let Tareas = [
  {
    id: 1,
    titulo: "Entregar portafolio",
    estado: "Terminado",
  },

  {
    id: 2,
    titulo: "Practicar Js",
    estado: "En progreso",
  },

  {
    id: 3,
    titulo: "Pasar apuntes",
    estado: "Pendiente",
  },
];

window.addEventListener("load", () => {
  //edicion formulario
  let $form = $(".form");
  let $formulario = $(".formulario");

  // validación titulo
 
  let $title = $("#title");
  const $titleEdit = $("#titleEdit");
  let $titleErrors = $("#titleErrors");
  let $EditError = $("#EditError");

  //validación estado
  let $state = $("#state");
  let $stateErrors = $("#stateErrors");

  const $stateEdit = $("#stateEdit");
  const $stateErrorsEdit = $("#stateEditErrors")
  // ModalCrear
  const $openModal = $("#create-modal");
  const $closeModal = $("#close-modal");
  const $modalCreate = $(".contain-modalCreate");

  //  Modaledit
  const $modalEdit = $(".contain-modalEdit");
  const $closeModalEdit = $("#close-modalEdit");

  // ___________

  const $Pendientes = $(".pendientes");
  const $progreso = $(".progreso");
  const $terminadas = $(".terminadas");
  const $buttonModo = document.querySelector(".diseño");

  // toggle
  const $body = document.querySelector("body");

  $closeModalEdit.addEventListener("click", () => {
    $modalEdit.classList.remove("show-modalEdit");
  });

  $openModal.addEventListener("click", () => {
    $modalCreate.classList.add("show-modal");
  });
  $closeModal.addEventListener("click", () => {
    $modalCreate.classList.remove("show-modal");
  });

  $buttonModo.addEventListener("click", (e) => {
    e.preventDefault();
    $body.classList.toggle("oscuro");
  });

  const paint = (nodo, datos) => {
    nodo.innerHTML = "";
    datos.forEach((element) => {
      nodo.innerHTML += `<div class="card">
<p>${element.titulo}</p>
<p>${element.estado}</p>
<button class="edit" id=${element.id}>Editar</button>
<button class="delete" id= ${element.id}>Eliminar</button>
</div>`;
    });

    $deleteTarea = document.querySelectorAll(".delete");
    $deleteTarea.forEach((button) => {
      button.addEventListener("click", (e) => {
        Tareas = Tareas.filter((tarea) => tarea.id !== Number(e.target.id));
        const pendiente = Tareas.filter((elem) => elem.estado === "Pendiente");
        paint($Pendientes, pendiente);

        const enProgreso = Tareas.filter(
          (elem) => elem.estado === "En progreso"
        );
        paint($progreso, enProgreso);

        const terminadas = Tareas.filter((elem) => elem.estado === "Terminado");
        paint($terminadas, terminadas);
      });
    });

   
    $EditarTarea = document.querySelectorAll(".edit");
    $EditarTarea.forEach((button) => {
      button.addEventListener("click", (e) => {
        $modalEdit.classList.add("show-modalEdit");
      
        const editarTarea = Tareas.find(
          (tarea) => tarea.id === Number(e.target.id)
        );
        $stateEdit.value = editarTarea.estado;
        $titleEdit.value = editarTarea.titulo;
        
        
      });
    });
  };

  const pendiente = Tareas.filter((elem) => elem.estado === "Pendiente");
  paint($Pendientes, pendiente);

  const enProgreso = Tareas.filter((elem) => elem.estado === "En progreso");
  paint($progreso, enProgreso);

  const terminadas = Tareas.filter((elem) => elem.estado === "Terminado");
  paint($terminadas, terminadas);

  $formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    let errores = false;

    if ($titleEdit.value.length <= 5) {
      $EditError.innerHTML = "Titulo muy corto";
      $EditError.style.color = "#232122";
      $EditError.style.fontFamily = "Lora";
      $EditError.style.fontSize = "18px";
      errores = true;
    } else {
      $EditError.innerHTML = "";
    }
    

   if (!errores) {
    
       Tareas.push({
        id: Tareas[Tareas.length - 1].id + 1,
        titulo: $titleEdit.value,
        estado: $stateEdit.value,
      });
      const pendiente = Tareas.filter((elem) => elem.estado === "Pendiente");
      paint($Pendientes, pendiente);

      const enProgreso = Tareas.filter((elem) => elem.estado === "En progreso");
      paint($progreso, enProgreso);

      const terminadas = Tareas.filter((elem) => elem.estado === "Terminado");
      paint($terminadas, terminadas);
      $modalEdit.classList.remove("show-modalEdit");
    }

  });
  
  $titleEdit.addEventListener("blur", () => {
    if (!$titleEdit.value.trim()) {
      $EditError.innerHTML = "Debe ingresar un titulo";
      $EditError.style.color = "#980018";
      $EditError.style.fontFamily = "Lora";
      $EditError.style.fontSize = "18px";
      errores=true;
    } else {
      $EditError.innerHTML = " ";
      }
  });

  $form.addEventListener("submit", (e) => {
    e.preventDefault();

    let errors = false;

    if ($title.value.length <= 5) {
      $titleErrors.innerHTML = "Titulo muy corto";
      $titleErrors.style.color = "#232122";
      $titleErrors.style.fontFamily = "Lora";
      $titleErrors.style.fontSize = "18px";
      errors = true;
    } else {
      $titleErrors.innerHTML = "";
    }

    if ($state.value == "") {
      $stateErrors.innerHTML = "Seleccione un estado";
      $stateErrors.style.color = "#232122";
      $stateErrors.style.fontFamily = "Lora";
      $stateErrors.style.fontSize = "18px";
      errors = true;
    } else {
      $stateErrors.innerHTML = "";
    }

    if (!errors) {
       Tareas.push({
        id: Tareas[Tareas.length - 1].id + 1,
        titulo: $title.value,
        estado: $state.value,
      });
      const pendiente = Tareas.filter((elem) => elem.estado === "Pendiente");
      paint($Pendientes, pendiente);

      const enProgreso = Tareas.filter((elem) => elem.estado === "En progreso");
      paint($progreso, enProgreso);

      const terminadas = Tareas.filter((elem) => elem.estado === "Terminado");
      paint($terminadas, terminadas);
      $modalCreate.classList.remove("show-modal");
    }


   $title.addEventListener("blur", () => {
    if (!$title.value.trim()) {
      $titleErrors.innerHTML = "Ingrese un Titulo";
      $titleErrors.style.color = "#980018";
      $titleErrors.style.fontFamily = "Lora";
      $titleErrors.style.fontSize = "18px";
    }
  });


  });

  

});
