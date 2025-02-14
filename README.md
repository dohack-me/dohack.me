# dohack.me

A full-stack NextJS app.

Containers for apps required by challenges are managed by [orchestrator](https://github.com/dohack-me/orchestrator)

## Stack

- Azure (only reason is because of student plan lol)
  - PostgreSQL
  - Blob Storage
  - VM running [FlexifyIO CE](https://hub.docker.com/r/flexifyio/ce)
- DigitalOcean
  - VM running [orchestrator](https://github.com/dohack-me/orchestrator)
- Homelab
  - Containe running frontend

## Notes

this is my first real full-stack project, hopefully the code is not too cursed

i think i made a mistake having each component hit the db for the data it requires but its too late to go back now lmao

