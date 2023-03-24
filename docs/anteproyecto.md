# Anteproyecto

> NOTA: Incluir diagramas donde proceda (diagramas de clases, casos de uso, entidad relación, ...).

## OBJETIVOS

El objetivo que se pretende alcanzar es conseguir compartir múltiples archivos en varios equipos en la red al mismo tiempo.
El proyecto será utilizado a las empresas que se dediquen a la transferencia de múltiples archivos que estén conectadas a la misma red local y multicast.
Crear una App donde hayan por ejemplo dos usuarios con distinto dispositivo en el cual puedan hacer la transferencia por la misma red local.
Y quiero presentarles este proyecto para mostrarle cuál es mi propuesta y enseñarles una manera más económica.

## PREANALISIS DE LO EXISTENTE (Opcional)

*[TODO] Si procede, se informará brevemente sobre el funcionamiento del sistema actual. El que vamos a reemplazar o a mejorar. Este sistema no tiene por qué estar necesariamente automatizado pudiendo realizarse actualmente de forma manual por personas.*

## ANÁLISIS DEL SOFTWARE

Lo que el software tiene que hacer es compartir varios archivos entre equipos que estén conectadas a la misma red local.

El requisito que el software tiene que cumplir es a parte tener dos equipos con distinto S.O., que el receptor y el emisor tengan el software en ejecución mientras se están compartiendo los archivos y que estén conectadas a la misma red local.

![image](https://user-images.githubusercontent.com/90828819/227519329-dfa6e554-8f13-40e9-8e84-30c1a23e8f19.png)

Este diagrama es un estudio de una aplicación que se encarga de la transferencia de los archivos por red local y multicast.

## DISEÑO DEL SOFTWARE

Las posibles propuesta de la implementación del software son:
Implementación utilizando una herramienta ejecutable. 
Implementarlo en una APP (Aplicación de Android hecho en java). 
Implementarlo en el lenguaje de programación C++.

La implementación se llevará a cabo un app gráfica que es el cliente que se conectará al servidor la gente que quiera descargar los archivos se tienen que conectar al servidor.

![image](https://user-images.githubusercontent.com/90828819/226180659-a13f3526-a353-4ad0-9bb6-1a4f8f461e48.png)

Para la validación del proceso, el proceso 1.1 recibir archivo obtiene información de los archivos que ha recibido y es primitivo, en el proceso 1.2 obtiene una lista con la información de los archivos y es primitivo, en el proceso 1.3 antes de validarlo comprueba el archivo antes y no es primitivo.

![image](https://user-images.githubusercontent.com/90828819/226180732-d801006b-3f61-41b8-b716-ffe5d81d8240.png)

Para la validación, el proceso 2.1 arrastra el archivo y es primitivo, en el 2.2 prepara el archivo para su envío y es primitivo, en el 2.3 registra los archivos que son pendientes(que aún quedan por la operación) y es primitivo, en el proceso 2.4 realizar el envío del archivo y no es primitivo.

## ESTIMACIÓN DE COSTES

La estimación del coste a la hora de crear mi proyecto sería 35€ por hora pero depende según la aplicación que vaya a desarrollar y el tiempo que requiere la App: si es una App sencilla pues el coste sería una cierta cantidad con su duración, si la desarrollo en forma básica pues el coste sería diferente y si la hago compleja pues también diferente.
