# Utiliser l'image de base avec le SDK Android
FROM openjdk:8-jdk

# Installer les d�pendances n�cessaires
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    git \
    && apt-get clean

# D�finir les variables d'environnement pour le SDK Android
ENV ANDROID_SDK_ROOT /sdk
ENV PATH ${PATH}:${ANDROID_SDK_ROOT}/tools:${ANDROID_SDK_ROOT}/tools/bin:${ANDROID_SDK_ROOT}/platform-tools

# T�l�charger et installer le SDK Android
RUN wget https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip -O sdk-tools-linux.zip \
    && mkdir -p ${ANDROID_SDK_ROOT} \
    && unzip sdk-tools-linux.zip -d ${ANDROID_SDK_ROOT} \
    && rm sdk-tools-linux.zip

# Accepter les licences
RUN yes | sdkmanager --licenses

# Installer les packages SDK Android n�cessaires (remplacer par les versions dont tu as besoin)
RUN sdkmanager "platform-tools" "platforms;android-30" "build-tools;30.0.3"

# Copier le code source de l'application dans le conteneur
COPY . .

# D�finir le r�pertoire de travail
WORKDIR .

# Construire l'application (remplacer par la commande de build de ton projet)
RUN ./gradlew build

# Lancer l'application (remplacer par la commande d'ex�cution de ton projet)
CMD ["./gradlew", "assembleDebug"]