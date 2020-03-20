{{- define "todo-service.fullname" }}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "todo-service.labels" -}}
app.kubernetes.io/name: {{ include "todo-service.fullname" . }}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/version: {{ .Chart.AppVersion }}
app.kubernetes.io/component: backend
{{- end -}}

{{- define "todo-service.postgres-env" -}}
env:
  - name: POSTGRES_PASSWORD
    valueFrom:
      secretKeyRef:
        name: {{ include "todo-service.fullname" . }}
        key: postgresql-password
envFrom:
  - configMapRef:
      name: {{ template "todo-service.fullname" . }}
{{- end -}}
