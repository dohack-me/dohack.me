-- CreateTable
CREATE TABLE "socket_instances" (
    "userId" UUID NOT NULL,
    "socketId" UUID NOT NULL,
    "id" UUID NOT NULL,
    "port" INTEGER NOT NULL,

    CONSTRAINT "socket_instances_pkey" PRIMARY KEY ("userId","socketId")
);

-- AddForeignKey
ALTER TABLE "socket_instances" ADD CONSTRAINT "socket_instances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socket_instances" ADD CONSTRAINT "socket_instances_socketId_fkey" FOREIGN KEY ("socketId") REFERENCES "sockets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
