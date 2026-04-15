-- SQL Script for CrochetStudio

-- Categorias
INSERT INTO categorias (id, nombre) VALUES
(1, 'Anime'),
(2, 'Pokémon'),
(3, 'Naruto'),
(4, 'Películas'),
(5, 'Series'),
(6, 'Fantasía'),
(7, 'Animales'),
(8, 'Personalizados'),
(9, 'Novedades'),
(10, 'Promocion'),
(11, 'Adult Swim'),
(12, 'Animación'),
(13, 'Asiáticos'),
(14, 'Attack on Titan'),
(15, 'Bleach'),
(16, 'Bosque'),
(17, 'Brujería'),
(18, 'Cartoon Network'),
(19, 'Creatividad'),
(20, 'Criaturas mágicas'),
(21, 'Criaturas élficas'),
(22, 'Demon Slayer'),
(23, 'Deportes'),
(24, 'Disney'),
(25, 'Dragon Ball'),
(26, 'DreamWorks'),
(27, 'Estudiantes'),
(28, 'Eventos'),
(29, 'Familia'),
(30, 'Geek'),
(31, 'Granja'),
(32, 'Infantil'),
(33, 'Magos'),
(34, 'Mascotas'),
(35, 'My Hero Academia'),
(36, 'Netflix'),
(37, 'One Piece'),
(38, 'Pixar'),
(39, 'Profesiones'),
(40, 'Regalo Especial'),
(41, 'Sailor Moon'),
(42, 'Salvajes'),
(43, 'Stop Motion'),
(44, 'Studio Ghibli'),
(45, 'Toy Story'),
(46, 'Ártico');

-- Productos, Producto_Categorias, e Imagenes
-- Producto: Pikachu Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(1, 'Pikachu Amigurumi', 42000, NULL, 'Pikachu tejido a mano de 20 cm.', 'Pikachu (Pokémon)', 'Algodón mercerizado amarillo', '2.0 mm', 'Media', '20 cm', '6 horas', 'Ideal para fans del anime. Detalles bordados a mano y suave al tacto.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (1, 9), (1, 1), (1, 2);
INSERT INTO imagenes (producto_id, url) VALUES
(1, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/pikachu1.png'),
(1, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/pikachu2.png'),
(1, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/pikachu3.png');

-- Producto: Charmander Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(2, 'Charmander Amigurumi', 43000, NULL, 'Charmander con colita de fuego tejida a mano.', 'Charmander (Pokémon)', 'Algodón naranja y rojo', '2.0 mm', 'Media', '22 cm', '6.5 horas', 'Con detalles bordados. Incluye su clásica llama en la cola.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (2, 1), (2, 2);
INSERT INTO imagenes (producto_id, url) VALUES
(2, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/chanmander1.png'),
(2, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/chanmander2.png'),
(2, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/chanmander3.png');

-- Producto: Bulbasaur Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(3, 'Bulbasaur Amigurumi', 43000, NULL, 'Bulbasaur con planta en la espalda.', 'Bulbasaur (Pokémon)', 'Algodón verde y azul', '2.0 mm', 'Media', '20 cm', '7 horas', 'Bulbo tejido por separado y cosido. Muy decorativo y adorable.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (3, 1), (3, 2);
INSERT INTO imagenes (producto_id, url) VALUES
(3, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Bulbasaur1.png'),
(3, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Bulbasaur2.png'),
(3, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Bulbasaur3.png');

-- Producto: Squirtle Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(4, 'Squirtle Amigurumi', 42000, NULL, 'Squirtle con caparazón y ojitos tiernos.', 'Squirtle (Pokémon)', 'Algodón celeste y marrón', '2.0 mm', 'Media', '20 cm', '6 horas', 'Caparazón tejido con forma y detalles bordados. Perfecto para colección.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (4, 1), (4, 2);
INSERT INTO imagenes (producto_id, url) VALUES
(4, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Squirtle1.png'),
(4, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Squirtle2.png'),
(4, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Squirtle3.png');

-- Producto: Eevee Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(5, 'Eevee Amigurumi', 45000, NULL, 'Eevee peludito con orejitas tejidas.', 'Eevee (Pokémon)', 'Algodón y acrílico marrón', '2.5 mm', 'Media', '23 cm', '7 horas', 'Incluye lana peludita en el cuello. Muy suave y decorativo.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (5, 1), (5, 2);
INSERT INTO imagenes (producto_id, url) VALUES
(5, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Eevee1.png'),
(5, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Eevee2.png'),
(5, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Eevee3.png');

-- Producto: Snorlax Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(6, 'Snorlax Amigurumi', 47000, NULL, 'Snorlax dormilón para decorar o abrazar.', 'Snorlax (Pokémon)', 'Algodón grueso azul oscuro', '3.0 mm', 'Media', '25 cm', '6.5 horas', 'Muñeco grande y mullido. Muy usado como cojín o regalo divertido.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (6, 1), (6, 2);
INSERT INTO imagenes (producto_id, url) VALUES
(6, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Snorlax1.png'),
(6, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Snorlax2.png'),
(6, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Snorlax3.png');

-- Producto: Gengar Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(7, 'Gengar Amigurumi', 46000, NULL, 'Gengar malicioso pero adorable.', 'Gengar (Pokémon)', 'Acrílico violeta', '2.5 mm', 'Media', '21 cm', '6 horas', 'Con su sonrisa tejida y sus orejitas puntiagudas, ¡asusta con ternura!');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (7, 1), (7, 2);
INSERT INTO imagenes (producto_id, url) VALUES
(7, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Gengar1.png'),
(7, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Gengar2.png'),
(7, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Gengar3.png');

-- Producto: Deku Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(8, 'Deku Amigurumi', 50000, NULL, 'Deku en uniforme de héroe con su cabello verde.', 'Izuku Midoriya (My Hero Academia)', 'Algodón verde, negro y rojo', '2.25 mm', 'Alta', '24 cm', '8 horas', 'Incluye su traje de héroe con detalles bordados. Ideal para coleccionistas de anime.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (8, 1), (8, 35);
INSERT INTO imagenes (producto_id, url) VALUES
(8, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Deku1.png'),
(8, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Deku2.png'),
(8, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Deku3.png');

-- Producto: Bakugo Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(9, 'Bakugo Amigurumi', 51000, NULL, 'Bakugo con su expresión explosiva y traje heroico.', 'Katsuki Bakugo (My Hero Academia)', 'Algodón naranja, negro y gris', '2.5 mm', 'Alta', '24 cm', '8.5 horas', 'Incluye detalles de granadas en sus manos y peinado puntiagudo.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (9, 1), (9, 35);
INSERT INTO imagenes (producto_id, url) VALUES
(9, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Bakugo1.png'),
(9, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Bakugo2.png'),
(9, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Bakugo3.png');

-- Producto: Todoroki Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(10, 'Todoroki Amigurumi', 51000, NULL, 'Todoroki con mitad rojo y mitad blanco.', 'Shoto Todoroki (My Hero Academia)', 'Algodón rojo, blanco y azul', '2.5 mm', 'Alta', '24 cm', '8 horas', 'Cabello bicolor y uniforme fiel al personaje. Uno de los más pedidos.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (10, 1), (10, 35);
INSERT INTO imagenes (producto_id, url) VALUES
(10, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Shoto1.png'),
(10, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Shoto2.png'),
(10, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Shoto3.png');

-- Producto: Nezuko Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(11, 'Nezuko Amigurumi', 50000, NULL, 'Nezuko en forma chibi con su kimono rosa.', 'Nezuko Kamado (Demon Slayer)', 'Algodón rosado, negro y blanco', '2.25 mm', 'Alta', '25 cm', '8 horas', 'Incluye su cinta y bambú en la boca. Hermosa y detallada.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (11, 1), (11, 22);
INSERT INTO imagenes (producto_id, url) VALUES
(11, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Nezuko1.png'),
(11, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Nezuko2.png'),
(11, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Nezuko3.png');

-- Producto: Tanjiro Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(12, 'Tanjiro Amigurumi', 50000, NULL, 'Tanjiro con uniforme de cazador de demonios.', 'Tanjiro Kamado (Demon Slayer)', 'Algodón marrón, verde y negro', '2.5 mm', 'Alta', '25 cm', '8 horas', 'Pequeña cicatriz bordada, kimono a cuadros. Ideal para fans de Kimetsu.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (12, 1), (12, 22);
INSERT INTO imagenes (producto_id, url) VALUES
(12, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Tanjiro1.png'),
(12, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Tanjiro2.png'),
(12, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Tanjiro3.png');

-- Producto: Zenitsu Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(13, 'Zenitsu Amigurumi', 48000, NULL, 'Zenitsu con su uniforme amarillo brillante.', 'Zenitsu Agatsuma (Demon Slayer)', 'Algodón amarillo, naranja y negro', '2.25 mm', 'Media', '24 cm', '7.5 horas', 'Con su cabello amarillo y expresión asustada tejida.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (13, 1), (13, 22);
INSERT INTO imagenes (producto_id, url) VALUES
(13, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Zenitsu1.png'),
(13, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Zenitsu2.png'),
(13, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Zenitsu3.png');

-- Producto: Naruto Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(14, 'Naruto Amigurumi', 49000, 39000, 'Naruto con su cinta de Konoha y traje naranja.', 'Naruto Uzumaki (Naruto)', 'Algodón naranja, negro y piel', '2.25 mm', 'Alta', '25 cm', '8 horas', 'Incluye cinta tejida con símbolo y marcas en las mejillas.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (14, 1), (14, 3), (14, 10);
INSERT INTO imagenes (producto_id, url) VALUES
(14, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Naruto1.png'),
(14, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Naruto2.png'),
(14, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Naruto3.png');

-- Producto: Sasuke Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(15, 'Sasuke Amigurumi', 49000, NULL, 'Sasuke con su peinado y Sharingan bordado.', 'Sasuke Uchiha (Naruto)', 'Algodón azul, gris y negro', '2.5 mm', 'Alta', '24 cm', '8 horas', 'Con detalles de katana tejida y expresión seria.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (15, 1), (15, 3);
INSERT INTO imagenes (producto_id, url) VALUES
(15, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Sasuke1.png'),
(15, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Sasuke2.png'),
(15, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Sasuke3.png');

-- Producto: Kakashi Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(16, 'Kakashi Amigurumi', 50000, NULL, 'Kakashi con su Sharingan y libro tejido.', 'Kakashi Hatake (Naruto)', 'Algodón gris, negro y azul', '2.5 mm', 'Alta', '25 cm', '9 horas', 'Con máscara tejida, libro naranja y cabello blanco despeinado.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (16, 1), (16, 3);
INSERT INTO imagenes (producto_id, url) VALUES
(16, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Kakasi1.png'),
(16, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Kakasi2.png'),
(16, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Kakasi3.png');

-- Producto: Sakura Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(17, 'Sakura Amigurumi', 47000, NULL, 'Sakura con vestido ninja y cabello rosado.', 'Sakura Haruno (Naruto)', 'Algodón rosa, rojo y negro', '2.25 mm', 'Media', '24 cm', '7 horas', 'Diseño femenino, con su banda de ninja en el cabello.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (17, 1), (17, 3);
INSERT INTO imagenes (producto_id, url) VALUES
(17, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Sakura1.png'),
(17, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Sakura2.png'),
(17, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Sakura3.png');

-- Producto: Gaara Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(18, 'Gaara Amigurumi', 49000, NULL, 'Gaara con su cántaro de arena a la espalda.', 'Gaara (Naruto)', 'Algodón rojo, marrón y negro', '2.5 mm', 'Alta', '24 cm', '8 horas', 'Cántaro tejido aparte y expresión seria. Muy detallado.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (18, 1), (18, 3);
INSERT INTO imagenes (producto_id, url) VALUES
(18, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Gara1.png'),
(18, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Gara2.png'),
(18, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Gara3.png');

-- Producto: Goku Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(19, 'Goku Amigurumi', 50000, NULL, 'Goku con su traje naranja y cabello puntiagudo.', 'Goku (Dragon Ball)', 'Algodón naranja, negro y azul', '2.5 mm', 'Media', '25 cm', '7.5 horas', 'Muy reconocible. Cabello levantado tejido con volumen.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (19, 9), (19, 1), (19, 25);
INSERT INTO imagenes (producto_id, url) VALUES
(19, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Goku1.png'),
(19, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Goku2.png'),
(19, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Goku3.png');

-- Producto: Vegeta Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(20, 'Vegeta Amigurumi', 50000, NULL, 'Vegeta en su traje azul con cabello parado.', 'Vegeta (Dragon Ball)', 'Algodón azul, negro y blanco', '2.5 mm', 'Alta', '25 cm', '8 horas', 'Expresión orgullosa y cabello puntiagudo. Muy solicitado por fans.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (20, 1), (20, 25);
INSERT INTO imagenes (producto_id, url) VALUES
(20, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Vegeta1.png'),
(20, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Vegeta2.png'),
(20, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Vegeta3.png');

-- Producto: Gohan Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(21, 'Gohan Amigurumi', 48000, NULL, 'Gohan niño con ropa morada y cabello alborotado.', 'Gohan (Dragon Ball)', 'Algodón morado, negro y piel', '2.5 mm', 'Media', '22 cm', '7 horas', 'Perfecto para fans clásicos. Muy tierno en forma chibi.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (21, 1), (21, 25);
INSERT INTO imagenes (producto_id, url) VALUES
(21, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Gohan1.png'),
(21, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Gohan2.png'),
(21, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Gohan3.png');

-- Producto: Majin Buu Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(22, 'Majin Buu Amigurumi', 49000, NULL, 'Majin Buu con expresión alegre y rosado brillante.', 'Majin Buu (Dragon Ball)', 'Algodón rosa, amarillo y negro', '2.5 mm', 'Media', '24 cm', '7.5 horas', 'Con su capa tejida y pantalón bombacho. Muy gracioso.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (22, 1), (22, 25);
INSERT INTO imagenes (producto_id, url) VALUES
(22, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Manjiboo1.png'),
(22, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Manjiboo2.png'),
(22, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Manjiboo3.png');

-- Producto: Luffy Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(23, 'Luffy Amigurumi', 50000, NULL, 'Luffy con sombrero de paja tejido.', 'Monkey D. Luffy (One Piece)', 'Algodón rojo, azul, amarillo y piel', '2.25 mm', 'Alta', '25 cm', '8.5 horas', 'Sombrero tejido a mano, cara sonriente. Muy detallado.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (23, 1), (23, 37);
INSERT INTO imagenes (producto_id, url) VALUES
(23, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Luffy1.png'),
(23, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Luffy2.png'),
(23, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Luffy3.png');

-- Producto: Chopper Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(24, 'Chopper Amigurumi', 52000, NULL, 'Chopper adorable con sombrero azul.', 'Tony Tony Chopper (One Piece)', 'Algodón marrón, azul y rosado', '2.25 mm', 'Media', '20 cm', '7 horas', 'Cuernitos tejidos, orejitas suaves. Ideal para decorar.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (24, 1), (24, 37);
INSERT INTO imagenes (producto_id, url) VALUES
(24, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Chopper1.png'),
(24, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Chopper2.png'),
(24, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Chopper3.png');

-- Producto: Zoro Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(25, 'Zoro Amigurumi', 50000, NULL, 'Zoro con tres espadas y su cabello verde.', 'Roronoa Zoro (One Piece)', 'Algodón verde, blanco, negro', '2.5 mm', 'Alta', '25 cm', '8 horas', 'Espadas tejidas incluidas, peinado puntiagudo. Muy solicitado.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (25, 1), (25, 37);
INSERT INTO imagenes (producto_id, url) VALUES
(25, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Zoro1.png'),
(25, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Zoro2.png'),
(25, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Zoro3.png');

-- Producto: Nami Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(26, 'Nami Amigurumi', 48000, NULL, 'Nami con cabello naranja y top azul tejido.', 'Nami (One Piece)', 'Algodón naranja, azul y blanco', '2.25 mm', 'Media', '23 cm', '7 horas', 'Fácil de reconocer por su cabello brillante. Detalles femeninos.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (26, 1), (26, 37);
INSERT INTO imagenes (producto_id, url) VALUES
(26, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Nami1.png');

-- Producto: Sailor Moon Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(27, 'Sailor Moon Amigurumi', 51000, NULL, 'Sailor Moon con coletas largas tejidas.', 'Usagi Tsukino (Sailor Moon)', 'Algodón amarillo, blanco, rojo y azul', '2.25 mm', 'Alta', '25 cm', '8.5 horas', 'Incluye moños, tiara y traje característico. Muy linda y detallada.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (27, 1), (27, 41);
INSERT INTO imagenes (producto_id, url) VALUES
(27, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/SailorMoon1.png');

-- Producto: Luna Gato Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(28, 'Luna Gato Amigurumi', 43000, NULL, 'Luna, la gatita mágica con luna bordada.', 'Luna (Sailor Moon)', 'Algodón negro y amarillo', '2.0 mm', 'Fácil', '18 cm', '5 horas', 'Ideal para llavero o decoración. Muy tierna.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (28, 1), (28, 41);
INSERT INTO imagenes (producto_id, url) VALUES
(28, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Luna1cat.png');

-- Producto: Tuxedo Mask Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(29, 'Tuxedo Mask Amigurumi', 50000, NULL, 'Tuxedo Mask con sombrero y antifaz tejido.', 'Tuxedo Mask (Sailor Moon)', 'Algodón negro, blanco y rojo', '2.25 mm', 'Media', '25 cm', '7.5 horas', 'Sombrero alto, capa tejida. Complemento ideal de Sailor Moon.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (29, 1), (29, 41);
INSERT INTO imagenes (producto_id, url) VALUES
(29, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/TuxedoMask1.png');

-- Producto: Eren Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(30, 'Eren Amigurumi', 50000, NULL, 'Eren con uniforme del Cuerpo de Exploración.', 'Eren Yeager (Attack on Titan)', 'Algodón verde, marrón, piel y negro', '2.5 mm', 'Alta', '25 cm', '8.5 horas', 'Incluye capa con el logo de las alas. Estilo serio y heroico.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (30, 1), (30, 14);
INSERT INTO imagenes (producto_id, url) VALUES
(30, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Eren1.png');

-- Producto: Mikasa Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(31, 'Mikasa Amigurumi', 50000, NULL, 'Mikasa con bufanda roja y uniforme.', 'Mikasa Ackerman (Attack on Titan)', 'Algodón negro, gris, rojo y piel', '2.5 mm', 'Alta', '24 cm', '8 horas', 'Bufanda tejida en hilo fino, cabello corto muy definido.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (31, 1), (31, 14);
INSERT INTO imagenes (producto_id, url) VALUES
(31, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Mikaza1.png');

-- Producto: Levi Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(32, 'Levi Amigurumi', 51000, NULL, 'Levi con expresión seria y traje de explorador.', 'Levi Ackerman (Attack on Titan)', 'Algodón azul, verde y gris', '2.5 mm', 'Alta', '24 cm', '8 horas', 'Traje completo con capa. Peinado liso hacia adelante. Muy solicitado.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (32, 1), (32, 14);
INSERT INTO imagenes (producto_id, url) VALUES
(32, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Levi1.png');

-- Producto: Totoro Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(33, 'Totoro Amigurumi', 46000, NULL, 'Totoro gris con pancita blanca y orejas grandes.', 'Totoro (My Neighbor Totoro)', 'Algodón gris y blanco', '2.25 mm', 'Fácil', '22 cm', '6 horas', 'Forma redondita, ideal para decoración o regalo tierno.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (33, 1), (33, 44);
INSERT INTO imagenes (producto_id, url) VALUES
(33, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Todoro1.png');

-- Producto: Soot Sprite Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(34, 'Soot Sprite Amigurumi', 35000, NULL, 'Soot Sprite con ojitos saltones tejidos.', 'Soot Sprite (Spirited Away)', 'Acrílico negro y blanco', '2.0 mm', 'Muy fácil', '8 cm', '2 horas', 'Pequeños y suaves. Perfectos como llaveros o decorativos.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (34, 1), (34, 44);
INSERT INTO imagenes (producto_id, url) VALUES
(34, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Soot1.png');

-- Producto: Calcifer Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(35, 'Calcifer Amigurumi', 42000, NULL, 'Calcifer, la llamita encantada con ojos bordados.', 'Calcifer (Howl’s Moving Castle)', 'Algodón naranja, amarillo y rojo', '2.25 mm', 'Fácil', '10 cm', '3 horas', 'Ideal como adorno. Carita expresiva bordada a mano.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (35, 1), (35, 44);
INSERT INTO imagenes (producto_id, url) VALUES
(35, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Calcifer1.png');

-- Producto: No-Face Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(36, 'No-Face Amigurumi', 45000, NULL, 'Kaonashi con máscara blanca y cuerpo negro.', 'Kaonashi (Spirited Away)', 'Algodón negro, blanco y rojo', '2.25 mm', 'Media', '18 cm', '5 horas', 'Figura simple pero muy expresiva. Muy icónico en amigurumi.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (36, 1), (36, 44);
INSERT INTO imagenes (producto_id, url) VALUES
(36, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Kaonashi1.png');

-- Producto: Ichigo Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(37, 'Ichigo Amigurumi', 50000, NULL, 'Ichigo con su uniforme negro y espada tejida.', 'Ichigo Kurosaki (Bleach)', 'Algodón naranja, negro y blanco', '2.5 mm', 'Alta', '25 cm', '8.5 horas', 'Incluye zanpakutō, peinado puntiagudo y expresión determinada.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (37, 1), (37, 15);
INSERT INTO imagenes (producto_id, url) VALUES
(37, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Ichigo1.png');

-- Producto: Rukia Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(38, 'Rukia Amigurumi', 48000, NULL, 'Rukia con su traje de shinigami y cabello corto.', 'Rukia Kuchiki (Bleach)', 'Algodón negro y blanco', '2.25 mm', 'Media', '24 cm', '7.5 horas', 'Muy fiel al personaje. Estilo sobrio y elegante.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (38, 1), (38, 15);
INSERT INTO imagenes (producto_id, url) VALUES
(38, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Rukia1.png');

-- Producto: Minion Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(39, 'Minion Amigurumi', 42000, NULL, 'Minion amarillo con overol azul tejido a mano.', 'Minion (Mi Villano Favorito)', 'Algodón amarillo, azul, negro y gris', '2.25 mm', 'Media', '20 cm', '6 horas', 'Divertido y simpático, ideal como regalo o adorno.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (39, 4), (39, 12);
INSERT INTO imagenes (producto_id, url) VALUES
(39, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Minion1.png');

-- Producto: Buzz Lightyear Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(40, 'Buzz Lightyear Amigurumi', 50000, NULL, 'Buzz con su traje espacial tejido con detalles.', 'Buzz Lightyear (Toy Story)', 'Algodón blanco, verde, morado y negro', '2.5 mm', 'Alta', '25 cm', '9 horas', 'Detalles bordados del traje espacial. Perfecto para fans de Pixar.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (40, 4), (40, 45);
INSERT INTO imagenes (producto_id, url) VALUES
(40, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Buzz1.png');

-- Producto: Woody Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(41, 'Woody Amigurumi', 50000, NULL, 'Woody con sombrero vaquero y pañuelo rojo.', 'Woody (Toy Story)', 'Algodón marrón, azul, amarillo y rojo', '2.5 mm', 'Alta', '25 cm', '8.5 horas', 'Sombrero tejido, chaleco con manchas de vaca y botas. Súper completo.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (41, 9), (41, 4), (41, 45);
INSERT INTO imagenes (producto_id, url) VALUES
(41, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Body1.png');

-- Producto: Mike Wazowski Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(42, 'Mike Wazowski Amigurumi', 45000, NULL, 'Mike con un gran ojo bordado y sonrisota tejida.', 'Mike Wazowski (Monsters Inc.)', 'Algodón verde, blanco y negro', '2.25 mm', 'Media', '18 cm', '5.5 horas', 'Brazos y piernas flexibles. Muy expresivo y simpático.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (42, 4), (42, 38);
INSERT INTO imagenes (producto_id, url) VALUES
(42, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Mike1.png');

-- Producto: Sully Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(43, 'Sully Amigurumi', 47000, NULL, 'Sully azul con manchas moradas y cuernitos.', 'Sully (Monsters Inc.)', 'Algodón azul celeste y morado', '2.5 mm', 'Media', '22 cm', '6.5 horas', 'Con cola tejida y textura suave. Ideal para combinar con Mike.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (43, 4), (43, 38);
INSERT INTO imagenes (producto_id, url) VALUES
(43, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Sully1.png');

-- Producto: Olaf Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(44, 'Olaf Amigurumi', 43000, NULL, 'Olaf el muñeco de nieve más adorable.', 'Olaf (Frozen)', 'Algodón blanco, negro y naranja', '2.0 mm', 'Fácil', '20 cm', '5 horas', 'Nariz de zanahoria tejida, ramitas en la cabeza. Muy infantil y tierno.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (44, 4), (44, 24);
INSERT INTO imagenes (producto_id, url) VALUES
(44, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Olaf1.png');

-- Producto: Baymax Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(45, 'Baymax Amigurumi', 46000, NULL, 'Baymax tejido con forma redondita y minimalista.', 'Baymax (Big Hero 6)', 'Algodón blanco y negro', '2.25 mm', 'Fácil', '22 cm', '5.5 horas', 'Ideal como cojín o adorno. Muy suave y esponjoso.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (45, 4), (45, 24);
INSERT INTO imagenes (producto_id, url) VALUES
(45, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Baymax1.png');

-- Producto: Jack Skellington Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(46, 'Jack Skellington Amigurumi', 48000, NULL, 'Jack con su esqueleto elegante tejido.', 'Jack Skellington (El extraño mundo de Jack)', 'Algodón blanco y negro', '2.5 mm', 'Media', '24 cm', '7 horas', 'Incluye traje de rayas tejido y cara expresiva bordada.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (46, 4), (46, 43);
INSERT INTO imagenes (producto_id, url) VALUES
(46, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Jack1.png');

-- Producto: Shrek Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(47, 'Shrek Amigurumi', 50000, NULL, 'Shrek tejido con chaleco y orejitas verdes.', 'Shrek', 'Algodón verde, marrón y blanco', '2.5 mm', 'Media', '25 cm', '7.5 horas', 'Con rostro simpático y expresión bordada. Muy divertido.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (47, 4), (47, 26);
INSERT INTO imagenes (producto_id, url) VALUES
(47, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Shrek1.png');

-- Producto: Fiona Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(48, 'Fiona Amigurumi', 49000, NULL, 'Fiona en su forma ogra con vestido verde.', 'Fiona (Shrek)', 'Algodón verde, piel, naranja y dorado', '2.5 mm', 'Media', '24 cm', '7.5 horas', 'Cabello naranja tejido con trenzas. Muy tierna y detallada.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (48, 4), (48, 26);
INSERT INTO imagenes (producto_id, url) VALUES
(48, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Fiona1.png');

-- Producto: Eleven Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(49, 'Eleven Amigurumi', 49000, NULL, 'Eleven con vestido rosa y chaqueta azul.', 'Eleven (Stranger Things)', 'Algodón rosa, azul, blanco y piel', '2.25 mm', 'Media', '23 cm', '7 horas', 'Con calcetines tejidos y peinado corto. Expresión seria.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (49, 5), (49, 36);
INSERT INTO imagenes (producto_id, url) VALUES
(49, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Eleven1.png');

-- Producto: Dustin Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(50, 'Dustin Amigurumi', 48000, NULL, 'Dustin con gorra y rizos tejidos.', 'Dustin Henderson (Stranger Things)', 'Algodón azul, rojo, blanco y marrón', '2.25 mm', 'Media', '23 cm', '6.5 horas', 'Gorra bicolor tejida, expresión alegre. Detalles de camiseta y mochila.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (50, 5), (50, 36);
INSERT INTO imagenes (producto_id, url) VALUES
(50, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Dustin1.png');

-- Producto: Wednesday Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(51, 'Wednesday Amigurumi', 48000, NULL, 'Wednesday con vestido negro y trenzas.', 'Merlina (Wednesday)', 'Algodón negro, blanco y piel', '2.25 mm', 'Media', '22 cm', '6 horas', 'Trenzas largas tejidas, vestido clásico. Estilo gótico y elegante.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (51, 5), (51, 36);
INSERT INTO imagenes (producto_id, url) VALUES
(51, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Wednesday1.png');

-- Producto: Homero Simpson Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(52, 'Homero Simpson Amigurumi', 47000, NULL, 'Homero con barriga tejida y camisa blanca.', 'Homero Simpson (Los Simpson)', 'Algodón amarillo, blanco y azul', '2.5 mm', 'Media', '23 cm', '7 horas', 'Cabeza redonda, ojos saltones y expresión divertida.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (52, 5), (52, 12);
INSERT INTO imagenes (producto_id, url) VALUES
(52, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Homero1.png');

-- Producto: Bart Simpson Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(53, 'Bart Simpson Amigurumi', 46000, NULL, 'Bart con patineta y camiseta roja.', 'Bart Simpson (Los Simpson)', 'Algodón amarillo, rojo, azul y blanco', '2.25 mm', 'Media', '22 cm', '6.5 horas', 'Cabello en picos, patineta opcional tejida. Muy popular entre niños.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (53, 9), (53, 5), (53, 12);
INSERT INTO imagenes (producto_id, url) VALUES
(53, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Bart1.png');

-- Producto: Lisa Simpson Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(54, 'Lisa Simpson Amigurumi', 46000, NULL, 'Lisa con su vestido rojo y collar blanco.', 'Lisa Simpson (Los Simpson)', 'Algodón amarillo, rojo y blanco', '2.0 mm', 'Media', '21 cm', '6 horas', 'Cabello en puntas, con expresión dulce y libro en mano opcional.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (54, 5), (54, 12);
INSERT INTO imagenes (producto_id, url) VALUES
(54, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Lisa1.png');

-- Producto: Finn Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(55, 'Finn Amigurumi', 47000, NULL, 'Finn con mochila verde y gorrito blanco.', 'Finn (Hora de Aventura)', 'Algodón blanco, azul, verde y piel', '2.25 mm', 'Fácil', '23 cm', '6 horas', 'Gorro característico tejido. Mochila rellena y brazos largos.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (55, 5), (55, 18);
INSERT INTO imagenes (producto_id, url) VALUES
(55, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Finn1.png');

-- Producto: Jake Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(56, 'Jake Amigurumi', 45000, NULL, 'Jake el perro con cuerpo redondo y ojos grandes.', 'Jake (Hora de Aventura)', 'Algodón amarillo y blanco', '2.0 mm', 'Fácil', '20 cm', '5.5 horas', 'Piernas y brazos flexibles. Muy suave y simpático.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (56, 5), (56, 18);
INSERT INTO imagenes (producto_id, url) VALUES
(56, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Jake1.png');

-- Producto: Rick Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(57, 'Rick Amigurumi', 49000, NULL, 'Rick con bata blanca y cejas locas tejidas.', 'Rick (Rick and Morty)', 'Algodón blanco, azul, gris y piel', '2.25 mm', 'Media', '24 cm', '7 horas', 'Cabello puntiagudo, bata tejida y expresión divertida.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (57, 5), (57, 11);
INSERT INTO imagenes (producto_id, url) VALUES
(57, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Rick1.png');

-- Producto: Morty Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(58, 'Morty Amigurumi', 47000, NULL, 'Morty con camiseta amarilla y ojos bordados con cara de susto.', 'Morty (Rick and Morty)', 'Algodón amarillo, azul y piel', '2.0 mm', 'Media', '23 cm', '6.5 horas', 'Peinado liso, postura encorvada. Ideal junto a Rick.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (58, 5), (58, 11);
INSERT INTO imagenes (producto_id, url) VALUES
(58, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Morty1.png');

-- Producto: Hada Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(59, 'Hada Amigurumi', 48000, NULL, 'Hada con alas translúcidas y vestido brillante.', 'Hada mágica', 'Algodón pastel, con detalles en hilo brillante', '2.25 mm', 'Media', '22 cm', '6.5 horas', 'Alas de tul o gasa, peinado trenzado y varita mágica tejida.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (59, 9), (59, 6), (59, 20);
INSERT INTO imagenes (producto_id, url) VALUES
(59, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Hada1.png');

-- Producto: Dragón Rojo Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(60, 'Dragón Rojo Amigurumi', 50000, NULL, 'Dragón rojo con alas y cola tejida.', 'Dragón de fuego', 'Algodón rojo, naranja y amarillo', '2.5 mm', 'Alta', '25 cm', '8.5 horas', 'Cuernos, alas tejidas y detalles escamosos. Muy vistoso y expresivo.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (60, 6), (60, 20);
INSERT INTO imagenes (producto_id, url) VALUES
(60, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Dragon1.png');

-- Producto: Unicornio Arcoíris Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(61, 'Unicornio Arcoíris Amigurumi', 47000, NULL, 'Unicornio blanco con crin de colores.', 'Unicornio mágico', 'Algodón blanco, multicolor para la crin', '2.25 mm', 'Media', '22 cm', '6 horas', 'Cuerno en espiral, pezuñas tejidas. Muy tierno y brillante.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (61, 6), (61, 20);
INSERT INTO imagenes (producto_id, url) VALUES
(61, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Unicornio1.png');

-- Producto: Elfo del Bosque Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(62, 'Elfo del Bosque Amigurumi', 49000, NULL, 'Elfo con orejas puntiagudas y capa verde.', 'Elfo del bosque', 'Algodón verde, marrón y beige', '2.25 mm', 'Media', '23 cm', '6.5 horas', 'Capa tejida, arco y flecha opcionales. Muy detallado y estilizado.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (62, 6), (62, 21);
INSERT INTO imagenes (producto_id, url) VALUES
(62, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Elfo1.png');

-- Producto: Brujita Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(63, 'Brujita Amigurumi', 47000, NULL, 'Brujita con sombrero puntiagudo y escoba tejida.', 'Bruja infantil', 'Algodón negro, violeta, naranja y piel', '2.0 mm', 'Media', '22 cm', '6 horas', 'Vestido en capas, escoba con palito de madera o tejido. Muy mágica.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (63, 6), (63, 17);
INSERT INTO imagenes (producto_id, url) VALUES
(63, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Brujita1.png');

-- Producto: Hechicero Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(64, 'Hechicero Amigurumi', 48000, NULL, 'Hechicero con túnica y bastón mágico.', 'Mago sabio', 'Algodón azul, gris y blanco', '2.5 mm', 'Media', '24 cm', '7 horas', 'Barba larga tejida, bastón con gema o nudo mágico. Muy místico.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (64, 6), (64, 33);
INSERT INTO imagenes (producto_id, url) VALUES
(64, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Hechicero1.png');

-- Producto: Sirena Arcoíris Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(65, 'Sirena Arcoíris Amigurumi', 49000, NULL, 'Sirena con cola multicolor y cabello largo.', 'Sirena de fantasía', 'Algodón piel, multicolor y rosa', '2.25 mm', 'Media', '23 cm', '6.5 horas', 'Cabello trenzado o suelto, cola con escamas tejidas. Muy brillante.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (65, 6), (65, 20);
INSERT INTO imagenes (producto_id, url) VALUES
(65, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Sirena1.png');

-- Producto: Pegaso Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(66, 'Pegaso Amigurumi', 47000, NULL, 'Pegaso blanco con alas extendidas.', 'Pegaso alado', 'Algodón blanco y azul pastel', '2.25 mm', 'Media', '23 cm', '6.5 horas', 'Alas tejidas con volumen, crin peinada. Muy elegante y etéreo.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (66, 6), (66, 20);
INSERT INTO imagenes (producto_id, url) VALUES
(66, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Pegaso1.png');

-- Producto: Duende Verde Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(67, 'Duende Verde Amigurumi', 46000, NULL, 'Duende travieso con gorro puntiagudo.', 'Duende del bosque', 'Algodón verde, beige y marrón', '2.0 mm', 'Media', '21 cm', '5.5 horas', 'Nariz grande, sonriendo. Perfecto para escenarios mágicos.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (67, 6), (67, 21);
INSERT INTO imagenes (producto_id, url) VALUES
(67, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Duende1.png');

-- Producto: Fénix Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(68, 'Fénix Amigurumi', 50000, NULL, 'Ave fénix de colores cálidos con alas abiertas.', 'Fénix legendario', 'Algodón rojo, naranja, amarillo y dorado', '2.5 mm', 'Alta', '25 cm', '8 horas', 'Plumas tejidas en capas, cuerpo flameante. Muy llamativo y único.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (68, 6), (68, 20);
INSERT INTO imagenes (producto_id, url) VALUES
(68, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Fenix1.png');

-- Producto: Perrito Pug Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(69, 'Perrito Pug Amigurumi', 45000, NULL, 'Perrito pug beige con hocico y orejas negras.', 'Pug clásico', 'Algodón beige, negro y marrón', '2.0 mm', 'Fácil', '18 cm', '5 horas', 'Hocico sobresaliente, orejas caídas y cola enroscada.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (69, 9), (69, 7), (69, 34);
INSERT INTO imagenes (producto_id, url) VALUES
(69, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Perritopug1.png');

-- Producto: Gatito Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(70, 'Gatito Amigurumi', 44000, NULL, 'Gatito blanco con manchitas y ojos grandes.', 'Gatito doméstico', 'Algodón blanco y gris', '2.0 mm', 'Fácil', '17 cm', '4.5 horas', 'Bigotes bordados, cuerpo redondo, muy suave al tacto.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (70, 9), (70, 7), (70, 34);
INSERT INTO imagenes (producto_id, url) VALUES
(70, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Gato1.png');

-- Producto: Conejo Blanco Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(71, 'Conejo Blanco Amigurumi', 43000, NULL, 'Conejito blanco con orejas largas y moño rosa.', 'Conejito tierno', 'Algodón blanco, rosa y gris', '2.0 mm', 'Fácil', '20 cm', '5 horas', 'Orejas caídas o de pie, nariz bordada, moño decorativo.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (71, 7), (71, 31), (71, 32);
INSERT INTO imagenes (producto_id, url) VALUES
(71, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Conejo1.png');

-- Producto: Zorrito Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(72, 'Zorrito Amigurumi', 46000, NULL, 'Zorro naranja con puntas blancas y cola esponjosa.', 'Zorro del bosque', 'Algodón naranja, blanco y negro', '2.25 mm', 'Media', '21 cm', '6 horas', 'Cola grande, cara triangular. Muy estilizado y elegante.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (72, 7), (72, 16);
INSERT INTO imagenes (producto_id, url) VALUES
(72, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Zorrito1.png');

-- Producto: Osito Polar Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(73, 'Osito Polar Amigurumi', 45000, NULL, 'Osito blanco con bufanda azul tejida.', 'Oso polar infantil', 'Algodón blanco y azul', '2.0 mm', 'Fácil', '19 cm', '5 horas', 'Bufanda tejida, nariz bordada. Perfecto para invierno o bebés.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (73, 7), (73, 46);
INSERT INTO imagenes (producto_id, url) VALUES
(73, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Osito1.png');

-- Producto: Tigre Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(74, 'Tigre Amigurumi', 47000, NULL, 'Tigre con rayas negras y expresión valiente.', 'Tigre selvático', 'Algodón naranja, negro y blanco', '2.5 mm', 'Media', '22 cm', '6.5 horas', 'Rayas bordadas, orejas pequeñas, nariz triangular.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (74, 7), (74, 42);
INSERT INTO imagenes (producto_id, url) VALUES
(74, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Tigre1.png');

-- Producto: Panda Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(75, 'Panda Amigurumi', 45000, NULL, 'Panda blanco y negro abrazable y tierno.', 'Panda clásico', 'Algodón blanco y negro', '2.0 mm', 'Fácil', '20 cm', '5 horas', 'Orejas redondas, ojos grandes, ideal para decoración kawaii.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (75, 7), (75, 13);
INSERT INTO imagenes (producto_id, url) VALUES
(75, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Panda1.png');

-- Producto: Erizo Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(76, 'Erizo Amigurumi', 46000, NULL, 'Erizo con espinas tejidas y carita amigable.', 'Erizo del bosque', 'Algodón marrón, beige y gris', '2.25 mm', 'Media', '19 cm', '5.5 horas', 'Espinas con puntos altos en bucle. Muy expresivo.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (76, 7), (76, 16);
INSERT INTO imagenes (producto_id, url) VALUES
(76, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Erizo1.png');

-- Producto: Pollito Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(77, 'Pollito Amigurumi', 42000, NULL, 'Pollito amarillo con pico pequeño y alas tejidas.', 'Pollito bebé', 'Algodón amarillo y naranja', '2.0 mm', 'Fácil', '16 cm', '4 horas', 'Muy redondo, ojos bordados. Perfecto para niños.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (77, 7), (77, 31);
INSERT INTO imagenes (producto_id, url) VALUES
(77, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Pollito1.png');

-- Producto: Vaca Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(78, 'Vaca Amigurumi', 47000, NULL, 'Vaca con manchas negras y campana tejida.', 'Vaca de granja', 'Algodón blanco, negro y rosa', '2.25 mm', 'Media', '21 cm', '6 horas', 'Orejas grandes, cuernitos tejidos, detalles campestre.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (78, 7), (78, 31);
INSERT INTO imagenes (producto_id, url) VALUES
(78, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Vaca1.png');

-- Producto: Muñeca Primera Comunión
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(79, 'Muñeca Primera Comunión', 70000, NULL, 'Muñeca vestida para primera comunión con rosario tejido.', 'Niña de comunión', 'Algodón blanco, beige y rosa', '2.0 mm', 'Alta', '23 cm', '7 horas', 'Vestido blanco con detalles, rosario en miniatura, cabello peinado según indicación.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (79, 8), (79, 28);
-- (No Supabase URL found for this product images)

-- Producto: Pareja de cumpleaños personalizada
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(80, 'Pareja de cumpleaños personalizada', 125000, NULL, 'Pareja personalizada para regalo de cumpleaños.', 'Dos personas con vestimenta casual o temática', 'Algodón según descripción del cliente', '2.25 mm', 'Alta', '25 cm cada uno', '15 horas', 'Peinados, ropa y detalles personalizados, colores elegidos por el cliente. Incluye base o peana.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (80, 8), (80, 40);
INSERT INTO imagenes (producto_id, url) VALUES
(80, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Pareja1.png');

-- Producto: Profesor de Ciencias
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(81, 'Profesor de Ciencias', 64000, NULL, 'Profesor con bata, gafas y tubos de ensayo tejidos.', 'Docente de ciencias', 'Algodón blanco, beige, azul', '2.0 mm', 'Media', '22 cm', '6 horas', 'Tubo de ensayo tejido, bata con bolsillos. Personalizable con nombre o logo escolar.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (81, 8), (81, 39);
INSERT INTO imagenes (producto_id, url) VALUES
(81, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Profesor1.png');

-- Producto: Médico Veterinario
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(82, 'Médico Veterinario', 66000, NULL, 'Veterinario con mascota tejida (gato o perro).', 'Doctor animalista', 'Algodón verde, marrón y tonos piel', '2.25 mm', 'Media', '23 cm', '6.5 horas', 'Incluye un pequeño animal tejido, estetoscopio, bata o uniforme según preferencia.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (82, 9), (82, 8), (82, 39), (82, 34);
INSERT INTO imagenes (producto_id, url) VALUES
(82, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 2/Veterinario1.png');

-- Producto: Chef Amigurumi
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(83, 'Chef Amigurumi', 65000, NULL, 'Cocinero o cocinera con gorro, delantal y utensilios.', 'Chef personalizado', 'Algodón blanco, rojo y beige', '2.25 mm', 'Media', '23 cm', '6 horas', 'Gorro alto tejido, espátula o sartén tejida, colores de delantal personalizables.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (83, 8), (83, 39);
INSERT INTO imagenes (producto_id, url) VALUES
(83, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Chef1.png');

-- Producto: Futbolista personalizado
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(84, 'Futbolista personalizado', 68000, NULL, 'Muñeco con uniforme del equipo favorito.', 'Jugador de fútbol personalizado', 'Algodón con colores del equipo', '2.25 mm', 'Media', '24 cm', '6 horas', 'Nombre en camiseta, balón tejido, peinado y color de piel personalizable.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (84, 8), (84, 23);
INSERT INTO imagenes (producto_id, url) VALUES
(84, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Futbolista1.png');

-- Producto: Muñeca mamá con bebé
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(85, 'Muñeca mamá con bebé', 85000, NULL, 'Muñeca con bebé en brazos o portabebé.', 'Madre y bebé', 'Algodón tonos piel y pastel', '2.25 mm', 'Alta', '25 cm', '7.5 horas', 'Bebé desmontable, ropa personalizada, cabello y accesorios elegidos por el cliente.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (85, 8), (85, 29), (85, 40);
-- (No Supabase URL found for this product images)

-- Producto: Muñeco Gamer
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(86, 'Muñeco Gamer', 70000, NULL, 'Muñeco con audífonos, control y camiseta geek.', 'Jugador de videojuegos', 'Algodón negro, gris y azul', '2.0 mm', 'Media', '22 cm', '6.5 horas', 'Control tejido, audífonos con aro de alambre, logo de videojuego bordado.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (86, 8), (86, 30);
INSERT INTO imagenes (producto_id, url) VALUES
(86, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Gamer1.png');

-- Producto: Muñeca artista pintora
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(87, 'Muñeca artista pintora', 68000, NULL, 'Muñeca con paleta de pintura, boina y pincel.', 'Artista creativa', 'Algodón colores vivos', '2.25 mm', 'Media', '23 cm', '6 horas', 'Boina, bata manchada, pincel tejido. Ideal para regalar a artistas.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (87, 8), (87, 39), (87, 19);
INSERT INTO imagenes (producto_id, url) VALUES
(87, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Artista1.png');

-- Producto: Muñeco con uniforme escolar
INSERT INTO productos (id, nombre, precio, precio_promocional, descripcion, personaje, tipo_lana, aguja, dificultad, tamano, tiempo_estimado, detalles) VALUES
(88, 'Muñeco con uniforme escolar', 63000, NULL, 'Muñeco con uniforme de colegio personalizado.', 'Estudiante escolar', 'Algodón azul marino, blanco, beige', '2.0 mm', 'Media', '22 cm', '6 horas', 'Uniforme según colegio, nombre en la mochila o gorra, cabello según foto.');
INSERT INTO producto_categorias (producto_id, categoria_id) VALUES (88, 8), (88, 27);
INSERT INTO imagenes (producto_id, url) VALUES
(88, 'https://<tu-proyecto>.supabase.co/storage/v1/object/public/Imagenes/Imagenes 1/Escolar1.png');
