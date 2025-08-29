# Rapport allure
- l'image playwright n'embarque pas maven, or allure n"cessite maven pour génerer ses rapport, donc
## solution 1
- 1- sur jenkins, il faut installer le plugin allure
- 2- dans les tools, recherchez maven, et cochez la case installer maintenant
## solution 2
- dans le dockerfile de docker dind, ajoutez maven dans l'instruction RUN apt install ...
- recréez une nouvelle image de docker dind
