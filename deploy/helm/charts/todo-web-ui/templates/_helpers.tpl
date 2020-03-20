{{- define "todo-web-ui.fullname" }}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "todo-web-ui.labels" -}}
app.kubernetes.io/name: {{ include "todo-web-ui.fullname" . }}
helm.sh/chart: "{{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}"
app.kubernetes.io/component: frontend
{{ include "todo-app.shared-labels" . }}
{{- end -}}
