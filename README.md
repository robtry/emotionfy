# Emotionfy

## Objetivo General

Identificar las emociones a través de las expresiones faciales en un video donde aparezcan rostros de personas.

## Planteamiento

Medir la satisfacción tras probar un producto, durante el trailer de una película, durante una película o anuncio comercial, en el transcurso de una conferencia o show de stand up, una obra de teatro, una clase educativa presencial o en línea. Se convierte en procesos de llenar encuestas. Y a partir de ellas se toman decisiones para mejorar, agregar, quitar contenido. La retroalimentación ayuda a los creadores de contenido para medir la efectividad percibida de su contenido /producto y establecer metas o expectativas.

## Alcance

Nuestro proyecto busca facilitar la obtención del primer filtro de retroalimentación. En
lugar de completar una larga encuesta sobre las sensaciones que provoca alguno de los
posibles eventos mencionados anteriormente, se puede consentir que una cámara
observe la cara y escuche las palabras de la persona. LLevando un registro durante qué
partes de la experiencia se mostraron expresiones como aburrimiento, interés,
confusión o sonrisas. (solo basándose en lo que expresa externamente).

## Solución al problema | Datasets

Por medio de los siguientes conjuntos de datos entrenaremos modelos para realizar las
clasificaciones, con base en las expresiones emitidas durante un periodo de tiempo:

-  https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognition-challenge/data

Poniendo al alcance el resultado final mediante una de aplicación web. El dataset consiste en 38,887 imagenes a escala de grises de 48x48 pixeles.

## Implementación

Busca estar implementado dentro de una aplicación web con las siguientes características:

-  Control de sesiones de usuario para que solo personas autenticadas puedan acceder.

- Pantalla de Iniciar sesión y Registrarse.

- En la página principal se muestran las opciones para subir nuevo contenido multimedia para su análisis.

- En la misma página principal se despliega el historial de contenido previamente analizado, donde se pueden seguir consultando los resultados.

- Idealmente se espera que las gráficas de tiempo vs reacciones cuenten con animación además de información al posicionarse sobre momentos específicos.

- Además de estadísticas generales sobre los resultados obtenidos del contenido subido por el usuario

## Diseño de la arquitectura

La arquitectura que utilizaremos es MERN (Mongo, Express, React y Nodejs). Acompañandola de Redis como auxiliar. Se ejecutara sobre contenedores Docker y utilizar Kubernetes como orquestador.

### Frontend

En el frontend utilizaremos React. Se encargará de actualizar y renderizar de manera eficiente los componentes correctos cuando los datos cambien. Esta biblioteca es una de las más utilizadas en el mundo del desarrollo web y nos ayuda a entregar una mejor experiencia del usuario al trabajar con el modelo de Single Page Application (SPA).

### Backend

En el backend utilizaremos Nodejs con Express. Con este framwork crearemos la API para poder acceder a los servicios de usuarios y videos analizados. Así mismo, a través de esta aplicación accederemos a la API de Amazon Rekognition para poder analizar los videos que queremos.

### Bases de datos

#### Mongo

Se guardaran los usuarios, y el contenido multimedia que suban. Además de los resultados obtenidos cada video o imagen. Específicamente los datos y estadísticas.

#### Redis

Usaremos esta base de datos para desacoplar nuestra arquitectura y brindar mayor redundancia y escalabilidad. Además de controlar las sesiones de usuarios.
