{{- define "todo-service.fullname" }}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "todo-service.labels" -}}
app.kubernetes.io/name: {{ include "todo-service.fullname" . }}
helm.sh/chart: "{{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}"
app.kubernetes.io/component: backend
{{ include "todo-app.shared-labels" . }}
{{- end -}}

{{- define "todo-service.postgres-env" -}}
envFrom:
  - configMapRef:
      name: {{ template "todo-service.fullname" . }}
  - secretRef:
      name: {{ template "todo-service.fullname" . }}
{{- end -}}
