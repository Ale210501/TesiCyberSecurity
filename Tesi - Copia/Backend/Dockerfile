# Dockerfile
FROM kalilinux/kali-rolling

# Installare pacchetti necessari
RUN apt-get update && \
    apt-get install -y xfce4 xfce4-goodies tightvncserver dbus-x11 x11-xserver-utils

# Creare una directory per VNC
RUN mkdir -p /root/.vnc

# Impostare la password per VNC
RUN echo "your_password" | vncpasswd -f > /root/.vnc/passwd && \
    chmod 600 /root/.vnc/passwd

# Copiare lo script di avvio
COPY start-vnc.sh /start-vnc.sh
RUN chmod +x /start-vnc.sh

# Esporre la porta VNC
EXPOSE 5901

# Comando di default
CMD ["/start-vnc.sh"]

