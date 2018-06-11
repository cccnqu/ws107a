

```
PS D:\linux> bash
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ pwd
/mnt/d/linux
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ echo $HOME
/home/ccckmit
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ ls $HOMEtmpccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ ls /home/ccckmit
tmp
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ ls ~/
tmp
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ ls /homeccckmit  dbuser
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ vim ~/.profile
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ vim ~/.profile
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ source ./profile
-bash: ./profile: No such file or directory
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ source ./.profile
-bash: ./.profile: line 17: syntax error: unexpected end of file
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ source .profile
-bash: .profile: line 17: syntax error: unexpected end of file
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ source .profile
-bash: .profile: line 17: syntax error: unexpected end of file
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ source .profile
-bash: .profile: line 17: syntax error: unexpected end of file
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ vim ~/.profile
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ source ~/.profile
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ cp ~/.profile /mnt/d/linux/
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ go version
go: cannot find GOROOT directory: /home/ccckmit/go
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ mkdir /home/ccckmit/go
ccckmit@DESKTOP-96FRN6B:/mnt/d/linux$ go version
go version go1.10 linux/amd64
```