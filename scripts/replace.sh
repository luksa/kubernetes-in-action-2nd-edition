DIR="$(cd $(dirname $0) ; pwd -P)"

source "${DIR}/../env"
luksa_prefix="luksa/"
mongo_image="mongo:7"

# bash based replacement of text
function replace() {
  command="$1"
  shift
  for resource in "${@}" ; do
    (cat ${resource} ; echo) | while IFS='' read -r text ; do
      IFS='' text="$(echo ${text//${luksa_prefix}/${PREFIX}})"
      echo "${text//${mongo_image}/${MONGO_IMAGE}}"
    done | kubectl "${command}" -f -
  done
}
