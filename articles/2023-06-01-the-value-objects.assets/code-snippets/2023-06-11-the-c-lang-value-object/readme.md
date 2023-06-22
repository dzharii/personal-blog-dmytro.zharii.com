Notes for C Value Objects samples

Date: 2023-06-11

GCC
```
gcc -Os -c main.c meters.c operation.c && gcc main.o meters.o operation.o -o main_program
```

CL
```
cl /O1 /c main.c meters.c operation.c && link main.obj meters.obj operation.obj /OUT:main_program.exe

```

Assembly

```
cl /FA /c meters.c 
```

Optimized for size:
```
cl /O1 /FA /c main.c meters.c operation.c
```

Generic
```
cl /FA /c main.c meters.c operation.c
```

All warnings as errors

```
cl /W4 /WX  /c  main.c meters.c operation.c && link main.obj meters.obj operation.obj /OUT:main_program.exe
```



