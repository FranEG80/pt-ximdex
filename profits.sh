#!/bin/bash

helpFunction()
{
   echo ""
   printUsage
   echo -e "\t-l path to logistic data file"
   echo -e "\t-c path to commercial data file"
   echo -e "\t-p save log at dir /logs/profits_logs_{DATE}.log (OPTIONAL)"
   echo -e "\t-t set Log level trace, values: LEVEL_INFO | LEVEL_ERROR | LEVEL_DEBUG (OPTIONAL)"
   echo -e "\t-o save the output a file. If value is 'true' o none the file by default is profits_output_{DATE}.log (OPTIONAL)"
   echo -e "\t-h show this help (OPTIONAL)"
   exit 1 # Exit script after printing help
}

printUsage()
{
  echo "Usage: $0 -logistic <string> -commercial <string> [-p] [-l <LEVEL_INFO|LEVEL_ERROR|LEVEL_DEBUG>] [-o <true|path_to_output>] [-h]"
}
usage() 
{ 
  printUsage 1>&2; exit 1; 
}

while getopts ":l:c:h:p t: o:" o; do
    case "${o}" in
        l) logistic=${OPTARG} ;;
        c) commercial=${OPTARG} ;;
        p) persistence=true ;;
        t) 
            logtrace=${OPTARG}
            if [[ "$logtrace" != 'LEVEL_ERROR' && "$logtrace" != 'LEVEL_INFO' && "$logtrace" != 'LEVEL_DEBUG' ]]
            then
                usage
            fi
            ;;
        o) output=${OPTARG} ;;
        h) helpFunction ;;
    esac
done

shift $((OPTIND-1))


if [ -z "${logistic}" ] || [ -z "${commercial}" ]; then
    usage
fi

if [ -z "${persistence}" ]
then 
  persistence=''
else
  persistence="--persistence"
fi

if [ -z "${logtrace}" ]
then 
  logtrace=''
else
  logtrace="--logtrace=${logtrace}"
fi

if [ -z "${output}" ]
then 
  output=''
else
  output="--output=${output}"
fi

ROOT_PATH="$(cd "$(dirname "$0")" && pwd)"
NODE_PATH="${ROOT_PATH}/ximdex-node"

cd ${NODE_PATH}
npm start --logistic=${ROOT_PATH}/${logistic} --commercial=${ROOT_PATH}/${commercial} ${persistence} ${logtrace} ${output}