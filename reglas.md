1️⃣ Estructura HTML

HTML semántico y estructural.

No usar valores arbitrarios tipo w-[1440px], text-[64px].

No usar estilos inline.

No replicar comentarios de Figma.

No definir alturas fijas innecesarias.

Usar container para limitar ancho.

El HTML debe describir estructura, no medidas exactas.

2️⃣ Sistema CSS

Usar exclusivamente los tokens definidos (colores, spacing, tipografía).

No crear nuevos tamaños.

No usar hex directos.

No inventar clases nuevas fuera del sistema.

No usar px fuera de tokens predefinidos.

Tipografía solo mediante las clases del sistema.

No duplicar estilos ya definidos globalmente.

3️⃣ Clamp

Usar únicamente los clamp() definidos para h1–h6 y body.

No crear nuevos clamps.

No mezclar clamp con valores fijos arbitrarios.

4️⃣ Comentarios

No incluir comentarios de medidas exportadas de Figma.

Solo comentarios estructurales si son estrictamente necesarios.

No documentar lo obvio.

5️⃣ Calidad del CSS

CSS organizado por bloques (Base / Layout / Components).

Sin reglas duplicadas.

Sin propiedades innecesarias.

Sin valores que no impacten visualmente.