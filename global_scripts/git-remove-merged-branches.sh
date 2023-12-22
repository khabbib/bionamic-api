git branch --merged | egrep -v "develop|\*" | xargs -n 1 git branch -d
