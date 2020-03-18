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

{{- define "todo-service.postgres-env" }}
- name: POSTGRES_HOST
  value: "{{ .Release.Name }}-{{ .Values.postgresql.nameOverride }}"
- name: POSTGRES_PORT
  value: "{{ .Values.postgresql.service.port }}"
- name: POSTGRES_DATABASE
  valueFrom:
    configMapKeyRef:
      name: {{ include "todo-service.fullname" . }}
      key: postgresql-database
- name: POSTGRES_USERNAME
  valueFrom:
    configMapKeyRef:
      name: {{ include "todo-service.fullname" . }}
      key: postgresql-username
- name: POSTGRES_PASSWORD
  valueFrom:
    secretKeyRef:
      name: {{ include "todo-service.fullname" . }}
      key: postgresql-password
{{- end -}}
