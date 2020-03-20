{{- define "todo-app.fullname" }}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "todo-app.shared-labels" -}}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
{{- end -}}

{{- define "todo-app.labels" }}
app.kubernetes.io/name: {{ include "todo-app.fullname" . }}
helm.sh/chart: "{{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}"
app.kubernetes.io/component: frontend
{{ include "todo-app.shared-labels" . }}
{{- end -}}

{{- define "todo-app.todo-service-fullname" }}
{{- printf "%s-%s" .Release.Name "todo-service" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "todo-app.todo-web-ui-fullname" }}
{{- printf "%s-%s" .Release.Name "todo-web-ui" | trunc 63 | trimSuffix "-" -}}
{{- end -}}
