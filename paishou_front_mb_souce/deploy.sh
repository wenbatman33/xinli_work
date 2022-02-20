#!/bin/sh
export SourceFolder=$(cd "$(dirname "$0")";pwd)
export BuildFolder=$(cd ../ "$(dirname "$0")";pwd)"/front_mb"

export npmDev="build_dev"
export npmLocal="build_local"
export npmStage="build_stage"
export npmMaster="build_production"

export branchDev="Develop"
export branchLocal="local"
export branchStage="Stage"
export branchMaster="master"


export outputDev="dev"
export outputLocal="local"
export outputStage="stage"
export outputMaster="master"


Building(){
  buildingMode="$1"
  npm="$2"
  branch="$3"
  output="$4"
  echo "Building "$buildingMode"..."
  echo "Go to SourceFolder...."
  echo $SourceFolder
  cd $SourceFolder
  echo "npm run "$npm
  npm run $npm
  echo "Go to BuildFolder...."
  echo $BuildFolder
  cd $BuildFolder
  echo "Pushing "$npm" version..."
  echo "git checkout "$branch"..."
  git checkout $branch
  echo "git pull..."
  git pull
  echo "Move new files..."
  rm -rf $BuildFolder/*
  mv $SourceFolder/output/$output/* $BuildFolder
  echo "git add..."
  git add .
  echo "git commit..."
  git commit -m "$(date +"%D %T")"
  echo "git push..."
  git push origin $branch
}
if [ $1  = "all" ]
then
  Building dev $npmDev $branchDev $outputDev
  Building $1 $npmStage $branchStage $outputStage
  Building master $npmMaster $branchMaster $outputMaster
else
  if [ $1  = "build_dev" ]
  then
    Building $1 $npmDev $branchDev $outputDev
  elif [ $1 = "build_local" ]
  then
    Building $1 $npmLocal $branchLocal $outputLocal
  elif [ $1 = "build_stage" ]
  then
    Building $1 $npmStage $branchStage $outputStage
  elif [ $1 = "build_production" ]
  then
    Building $1 $npmMaster $branchMaster $outputMaster
  fi
fi